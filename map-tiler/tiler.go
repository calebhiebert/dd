package main
import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"runtime"
	"time"

	minio "github.com/minio/minio-go"
	"github.com/vmihailenco/msgpack"
)

// GCSEvent is the payload of a GCS event. Please refer to the docs for
// additional information regarding GCS events.
type GCSEvent struct {
	Bucket string `json:"bucket"`
	Name   string `json:"name"`
}

type ProcessingResponse struct {
	M Mapping `json:"mapping"`
	D []byte  `json:"data"`
}

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

// MakeTiles will download the stuff from s3 and make the tiles
func MakeTiles(ctx context.Context, e GCSEvent) error {
	err := SetupS3Client()
	if err != nil {
		return err
	}

	img, err := GetPreparedImage(e.Name, e.Bucket)
	if err != nil {
		return err
	}

	details := GetImageDetails(img)

	// Clear the image and garbage collect it to save on ram
	img = nil
	runtime.GC()

	meta, err := pack(details, e.Name, e.Bucket)
	if err != nil {
		return err
	}

	err = makeWebhookRequest(meta)
	if err != nil {
		fmt.Println("\nWebhook request failed!")
	}

	err = s3.RemoveObject(e.Bucket, e.Name)
	if err != nil {
		return err
	}

	return nil
}

// ProcessTileList processes a tile list
func ProcessTileList(w http.ResponseWriter, r *http.Request) {
	var req ProcessingRequest

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		return
	}

	SetupS3Client()

	fmt.Println("Preparing image...")
	image, err := GetPreparedImage(req.ID, req.Bucket)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		return
	}
	fmt.Println("Image Prepared")

	fmt.Println("Processing Tiles")
	mapping, data, err := processTiles(image, req.Tiles)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		return
	}
	fmt.Println("Tiles Processed")

	fmt.Println("Encoding Response")
	b, err := msgpack.Marshal(&ProcessingResponse{
		M: mapping,
		D: data,
	})

	fmt.Println("Returning Response")

	w.Header().Set("Content-Type", "application/msgpack")
	w.Header().Set("Content-Length", fmt.Sprintf("%d", len(b)))

	_, err = io.Copy(w, bytes.NewReader(b))
	if err != nil {
		fmt.Println("Error during response!", err)
	}
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

