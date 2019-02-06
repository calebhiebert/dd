package tiler
import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"image"
	"image/color"
	"io"

	"github.com/disintegration/imaging"
	minio "github.com/minio/minio-go"
)

// MapMetadata stores information about a map
type MapMetadata struct {
	ID      string           `json:"id"`
	Mapping map[string][]int `json:"mapping"`
	MinZoom int              `json:"minZoom"`
	MaxZoom int              `json:"maxZoom"`
}

// TileConfig configuration for cutting out a tile
type TileConfig struct {
	ZoomLevel int
	ZoomSize  int
	X1        int
	X2        int
	Y1        int
	Y2        int
	TileX     int
	TileY     int
}

// pack will pack up the image and upload it to s3
func pack(src image.Image, id string) (*MapMetadata, error) {
	img := GetImageDetails(src)

	// Create a new square image and paste the old one into it
	boxImage := imaging.New(img.topDimension(), img.topDimension(), color.NRGBA{0, 0, 0, 0})
	src = imaging.PasteCenter(boxImage, src)

	tileConfigs := GetTileConfig(src)

	// Create a metadata object to store file information
	var meta MapMetadata
	meta.Mapping = make(map[string][]int)
	meta.MaxZoom = img.maxZoomLevelPow2() - zoomLevel0Pow2
	meta.MinZoom = 0
	meta.ID = id

	buf := bytes.Buffer{}
	sem := make(chan int, 4)
	writer := bufio.NewWriter(&buf)
	tiles := make(chan Tile, len(tileConfigs))

	byteCursor := 0

	for _, tile := range tileConfigs {
		sem <- 1
		go func() {
			t, err := GenerateTile(tile, src)
			if err != nil {
				fmt.Println(err)
			}

			tiles <- t
			<-sem
		}()
	}

	// Wait for rest of semaphore
	for i := 0; i < cap(sem); i++ {
		sem <- 1
	}

	for t := range tiles {
		meta.Mapping[fmt.Sprintf("%d_%d_%d", t.Z, t.X, t.Y)] = []int{byteCursor, byteCursor + len(t.Data)}
		_, err := writer.Write(t.Data)
		if err != nil {
			fmt.Println(err)
		}
		byteCursor += len(t.Data)
	}

	fmt.Println(len(meta.Mapping))

	fmt.Println("Starting Upload")

	_, err := s3.PutObject(bucketName, id+".map", &buf, -1, minio.PutObjectOptions{
		ContentType: "application/x-packmap",
	})

	fmt.Println("Upload Complete")

	// Serialize the meta object
	jsonBytes, err := json.Marshal(meta)
	if err != nil {
		return nil, err
	}

	// Upload the meta object to s3 as well
	_, err = s3.PutObject(bucketName, id+".json", bytes.NewReader(jsonBytes), int64(len(jsonBytes)), minio.PutObjectOptions{
		ContentType: "application/json",
	})
	if err != nil {
		return nil, err
	}

	return &meta, nil
}

// packFile takes an uploaded file and begins the tiling process
func packFile(file io.Reader, id string) (*MapMetadata, error) {

	// Decode the image
	img, err := imaging.Decode(file)
	if err != nil {
		return nil, err
	}

	// Pack the tiles and retrieve the meta object
	meta, err := pack(img, id)
	if err != nil {
		return nil, err
	}

	return meta, nil
}

