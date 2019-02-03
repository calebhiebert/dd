package main
import (
	"fmt"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	// startServer()
	pack()
}
func startServer() {
	mapping, err := getMapping()
	if err != nil {
		panic(err)
	}

	r := gin.Default()

	r.GET("/map/:z/:x/:y", func(c *gin.Context) {
		zoom, _ := strconv.Atoi(c.Param("z"))
		x, _ := strconv.Atoi(c.Param("x"))
		y, _ := strconv.Atoi(c.Param("y"))

		c.Header("Content-Type", "image/png")

		file, exists := mapping[fmt.Sprintf("%d_%d_%d", zoom, x, y)]
		if !exists {
			c.JSON(404, gin.H{"error": "Not found"})
			return
		}

		fmt.Printf("File: %+v\n", file)

		reader, err := getS3Reader(file[0], file[1])
		if err != nil {
			c.JSON(500, gin.H{"error": err})
			return
		}
		defer reader.Close()

		_, err = io.Copy(c.Writer, reader)
		if err != nil {
			c.JSON(500, gin.H{"error": err})
			return
		}
	})

	r.GET("/mapping", func(c *gin.Context) {
		c.JSON(200, mapping)
	})

	r.Run(":8081")
}

func getS3Reader(start, end uint64) (io.ReadCloser, error) {
	client := &http.Client{
		Timeout: 5 * time.Second,
	}

	request, err := http.NewRequest("GET", "https://dd-files.sfo2.cdn.digitaloceanspaces.com/packed.map", nil)
	if err != nil {
		return nil, err
	}

	request.Header.Set("Range", fmt.Sprintf("bytes=%d-%d", start, end))

	response, err := client.Do(request)
	if err != nil {
		return nil, err
	}

	return response.Body, nil
}

