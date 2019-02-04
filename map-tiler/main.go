package main
import (
	"fmt"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	minio "github.com/minio/minio-go"
)

var endpoint string
var accessKey string
var secretKey string
var bucketName string
var useSSL = true
var minioClient *minio.Client

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Could not load .env", err)
	}

	endpoint = os.Getenv("S3_SERVICE_URL")
	accessKey = os.Getenv("S3_ACCESS_KEY")
	secretKey = os.Getenv("S3_ACCESS_SECRET")
	bucketName = os.Getenv("S3_BUCKET_NAME")

	// Create a new s3 client to be reused
	client, err := minio.New(endpoint, accessKey, secretKey, useSSL)
	if err != nil {
		panic(err)
	}

	minioClient = client

	startServer()
}

func startServer() {
	r := gin.Default()

	r.POST("/upload", func(c *gin.Context) {
		if c.Query("password") != os.Getenv("PASSWORD") {
			c.JSON(401, gin.H{
				"error": "Unauthorized",
			})
			return
		}

		file, _ := c.FormFile("file")

		openFile, err := file.Open()
		if err != nil {
			panic(err)
		}

		meta, err := packFile(openFile)
		if err != nil {
			panic(err)
		}

		c.JSON(200, meta)
	})

	var port int

	if os.Getenv("PORT") != "" {
		p, err := strconv.Atoi(os.Getenv("PORT"))
		if err != nil {
			fmt.Println("Port Error", err)
			port = 8080
		} else {
			port = p
		}
	} else {
		port = 8080
	}

	r.Run(fmt.Sprintf(":%d", port))
}

