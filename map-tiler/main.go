package main
import (
	"context"
	"fmt"
	"os"
	"runtime"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

var tileConfigsPerWorker = 500
var maxConcurrentWorkers = 50

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

		img, err := GetPreparedImage(record.S3.Bucket.Name, record.S3.Object.Key)
		if err != nil {
			return err
		}

		details := GetImageDetails(img)

		// Clear the image and garbage collect it to save on ram
		img = nil
		runtime.GC()

		meta, err := pack(details, record.S3.Bucket.Name, record.S3.Object.Key)
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

	return events.APIGatewayProxyResponse{}, nil
}

