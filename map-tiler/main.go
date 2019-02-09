package main
import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"runtime"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	minio "github.com/minio/minio-go"
	"github.com/vmihailenco/msgpack"
)

var tileConfigsPerWorker = 100
var maxConcurrentWorkers = 75

// Zoom levels must be powers of 2
var zoomLevel0Pow2 = 8
var zoomLevelCapPow2 = 15
var tileSize = 256

var endpoint string
var accessKey string
var secretKey string
var bucketName string
var useSSL = true
var s3 *minio.Client

func main() {
	if os.Getenv("MODE") == "ingest" {
		lambda.Start(HandleTileIngest)
	} else if os.Getenv("MODE") == "processing" {
		lambda.Start(HandleTileProcessing)
	}
}

// HandleTileIngest handles ingesting a single image from S3
func HandleTileIngest(ctx context.Context, events events.S3Event) error {
	err := SetupS3Client()
	if err != nil {
		return err
	}

	for _, record := range events.Records {
		fmt.Printf("%+v\n", record)

		img, err := GetPreparedImage(record.S3.Object.Key, record.S3.Bucket.Name)
		if err != nil {
			return err
		}

		details := GetImageDetails(img)

		// Clear the image and garbage collect it to save on ram
		img = nil
		runtime.GC()

		meta, err := pack(details, record.S3.Object.Key, record.S3.Bucket.Name)
		if err != nil {
			return err
		}

		err = makeWebhookRequest(meta)
		if err != nil {
			fmt.Println("\nWebhook request failed!")
		}
	}

	return nil
}

// HandleTileProcessing handles processing a list of tiles
func HandleTileProcessing(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var response events.APIGatewayProxyResponse

	var jsonBytes []byte
	var err error

	if req.IsBase64Encoded {
		jsonBytes, err = base64.StdEncoding.DecodeString(req.Body)
		if err != nil {
			return response, err
		}
	} else {
		jsonBytes = []byte(req.Body)
	}

	var procRequest ProcessingRequest

	err = json.Unmarshal(jsonBytes, &procRequest)
	if err != nil {
		return response, err
	}

	SetupS3Client()

	fmt.Println("Preparing image...")
	image, err := GetPreparedImage(procRequest.ID, procRequest.Bucket)
	if err != nil {
		return response, err
	}
	fmt.Println("Image Prepared")

	fmt.Println("Processing Tiles")
	mapping, data, err := processTiles(image, procRequest.Tiles)
	if err != nil {
		return response, err
	}
	fmt.Println("Tiles Processed")

	fmt.Println("Encoding Response")
	b, err := msgpack.Marshal(&ProcessingResponse{
		M: mapping,
		D: data,
	})

	responseBase64 := base64.StdEncoding.EncodeToString(b)

	response.IsBase64Encoded = true
	response.Body = responseBase64
	response.StatusCode = 200
	response.Headers = make(map[string]string)
	response.Headers["Content-Type"] = "application/msgpack"

	fmt.Println("Encoded Body Size", len(responseBase64), "bytes")
	fmt.Println("Actual Body Size", len(b), "bytes")
	fmt.Println("All Done")

	return response, nil
}

func SetupS3Client() error {
	if s3 != nil {
		return nil
	}

	endpoint = os.Getenv("S3_SERVICE_URL")
	accessKey = os.Getenv("S3_ACCESS_KEY")
	secretKey = os.Getenv("S3_ACCESS_SECRET")
	bucketName = os.Getenv("S3_BUCKET_NAME")

	// Create a new s3 client to be reused
	client, err := minio.New(endpoint, accessKey, secretKey, useSSL)
	if err != nil {
		return err
	}

	s3 = client
	return nil
}

func makeWebhookRequest(meta *MapMetadata) error {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	jsonBytes, err := json.Marshal(meta)
	if err != nil {
		return err
	}

	resp, err := client.Post(fmt.Sprintf("%s?id=%s", os.Getenv("WEBHOOK_URL"), meta.ID), "application/json", bytes.NewReader(jsonBytes))
	if err != nil {
		return err
	}

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return errors.New("Invalid status code returned by webhook")
	}

	return nil
}

