package main
import (
	"bytes"
	"io"
	"strconv"

	"github.com/gin-gonic/gin"
	minio "github.com/minio/minio-go"
)

var endpoint = "sfo2.digitaloceanspaces.com"
var accessKey = "REPLACE_ME"
var secretKey = "REPLACE_ME"
var useSSL = true
var minioClient *minio.Client

func main() {
	client, err := minio.New(endpoint, accessKey, secretKey, useSSL)
	if err != nil {
		panic(err)
	}

	minioClient = client

	startServer()
}

func startServer() {
	r := gin.Default()

	r.GET("/bytez/:id", func(c *gin.Context) {
		id := c.Param("id")
		start, err := strconv.ParseUint(c.Query("start"), 10, 64)
		if err != nil {
			c.JSON(400, gin.H{"error": err})
			return
		}

		end, err := strconv.ParseUint(c.Query("end"), 10, 64)
		if err != nil {
			c.JSON(400, gin.H{"error": err})
			return
		}

		reader, err := getS3Reader(id, start, end)
		if err != nil {
			c.JSON(500, gin.H{"error": err})
			return
		}

		_, err = io.Copy(c.Writer, reader)
		if err != nil {
			c.JSON(500, gin.H{"error": err})
			return
		}
	})

	r.POST("/upload", func(c *gin.Context) {
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

	r.Run(":8081")
}

func getS3Reader(id string, start, end uint64) (io.Reader, error) {
	obj, err := minioClient.GetObject("dd-files", id+".map", minio.GetObjectOptions{})
	if err != nil {
		return nil, err
	}

	_, err = obj.Seek(int64(start), 0)
	if err != nil {
		return nil, err
	}

	data := make([]byte, end-start)

	_, err = obj.Read(data)
	if err != nil {
		return nil, err
	}

	return bytes.NewReader(data), nil
}

