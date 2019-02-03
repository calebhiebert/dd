package main
import (
	"bytes"
	"io"
	"os"

	"github.com/gin-gonic/gin"
	minio "github.com/minio/minio-go"
)

var endpoint = "sfo2.digitaloceanspaces.com"
var accessKey = "6CNWOLTKKM225GX4UWAL"
var secretKey = "iJJZwVopbCyj3rkitIuG/vLTHtQMG/cIV3oYf3Y/aRI"
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

	// r.GET("/map/:z/:x/:y", func(c *gin.Context) {
	// 	zoom, _ := strconv.Atoi(c.Param("z"))
	// 	x, _ := strconv.Atoi(c.Param("x"))
	// 	y, _ := strconv.Atoi(c.Param("y"))

	// 	c.Header("Content-Type", "image/png")

	// 	file, exists := mapping.Mapping[fmt.Sprintf("%d_%d_%d", zoom, x, y)]
	// 	if !exists {
	// 		c.JSON(404, gin.H{"error": "Not found"})
	// 		return
	// 	}

	// 	fmt.Printf("File: %+v\n", file)

	// 	reader, err := getS3Reader(file[0], file[1])
	// 	if err != nil {
	// 		c.JSON(500, gin.H{"error": err})
	// 		return
	// 	}
	// 	// defer reader.Close()

	// 	_, err = io.Copy(c.Writer, reader)
	// 	if err != nil {
	// 		c.JSON(500, gin.H{"error": err})
	// 		return
	// 	}
	// })

	r.POST("/upload", func(c *gin.Context) {
		file, _ := c.FormFile("file")

		openFile, err := file.Open()
		if err != nil {
			panic(err)
		}

		packFile(openFile)
	})

	r.Run(":8081")
}

func getS3Reader(start, end uint64) (io.Reader, error) {

	file, err := os.OpenFile("./out/packed.map", os.O_RDONLY, os.ModePerm)
	if err != nil {
		return nil, err
	}

	_, err = file.Seek(int64(start), 0)
	if err != nil {
		return nil, err
	}

	readBytes := end - start
	var byteSlice = make([]byte, readBytes)

	_, err = file.Read(byteSlice)
	if err != nil {
		return nil, err
	}

	return bytes.NewReader(byteSlice), nil

	// client := &http.Client{
	// 	Timeout: 5 * time.Second,
	// }

	// request, err := http.NewRequest("GET", "https://dd-files.sfo2.cdn.digitaloceanspaces.com/packed.map", nil)
	// if err != nil {
	// 	return nil, err
	// }

	// request.Header.Set("Range", fmt.Sprintf("bytes=%d-%d", start, end))

	// response, err := client.Do(request)
	// if err != nil {
	// 	return nil, err
	// }

	// return response.Body, nil
}

