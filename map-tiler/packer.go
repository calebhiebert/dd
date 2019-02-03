package main
import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"image"
	"image/color"
	"io"
	"math"
	"mime/multipart"
	"time"

	"github.com/disintegration/imaging"
	minio "github.com/minio/minio-go"
	uuid "github.com/satori/go.uuid"
)

var zoomLevels = []int{256, 512, 1024, 2048, 4096, 8192, 16384, 16384 * 2}
var tileSize = 256

func pack(src image.Image, id string) (*MapMetadata, error) {
	start := time.Now().UnixNano()

	imageHeight := src.Bounds().Dy()
	imageWidth := src.Bounds().Dx()

	topDimension := int(math.Max(float64(imageHeight), float64(imageWidth)))

	maxZoomLevel := len(zoomLevels) - 1

	for idx, zoom := range zoomLevels {
		if zoom > topDimension*2 {
			maxZoomLevel = idx
			break
		}
	}

	xDiff := topDimension - imageWidth
	yDiff := topDimension - imageHeight

	xLowerBound := xDiff / 2
	xUpperBound := imageWidth + (xDiff / 2)
	yLowerBound := yDiff / 2
	yUpperBound := imageHeight + (yDiff / 2)

	fmt.Printf("%d, %d, %d, %d, %d\n", xLowerBound, xUpperBound, yLowerBound, yUpperBound, topDimension)

	boxImage := imaging.New(topDimension, topDimension, color.NRGBA{0, 0, 0, 0})
	src = imaging.PasteCenter(boxImage, src)

	end := time.Now().UnixNano()

	fmt.Printf("Initial processing: %d\n", (end-start)/1000000)

	uploadChan := make(chan error)
	reader, writer := io.Pipe()

	go func(uploadChan chan error) {
		_, err := minioClient.PutObject("dd-files", id+".map", reader, -1, minio.PutObjectOptions{
			ContentType: "application/x-packmap",
		})

		uploadChan <- err
	}(uploadChan)

	var meta MapMetadata
	var byteCursor uint64
	levelCounter := 0

	meta.Mapping = make(map[string][]uint64)
	meta.MaxZoom = maxZoomLevel
	meta.MinZoom = 0
	meta.ID = id

	for _, level := range zoomLevels[:maxZoomLevel] {
		fmt.Printf("\nProcessing zoom level %d\n", level)

		xTiles := level / tileSize
		yTiles := level / tileSize

		fmt.Printf("Tiles %dx%d\n", xTiles, yTiles)

		// Cut out the tiles
		for x := 0; x < xTiles; x++ {
			for y := 0; y < yTiles; y++ {
				ratio := float64(topDimension) / float64(level)
				x1 := float64(x * tileSize)
				y1 := float64(y * tileSize)
				x2 := float64((x + 1) * tileSize)
				y2 := float64((y + 1) * tileSize)

				if int(math.Ceil(x2*ratio)) < xLowerBound ||
					int(math.Floor(x1*ratio)) > xUpperBound ||
					int(math.Ceil(y2*ratio)) < yLowerBound ||
					int(math.Floor(y1*ratio)) > yUpperBound {
					continue
				}

				tile := imaging.Crop(src, image.Rect(int(x1*ratio), int(y1*ratio), int(x2*ratio), int(y2*ratio)))
				tile = imaging.Resize(tile, tileSize, tileSize, imaging.Linear)

				var b bytes.Buffer
				tempWriter := bufio.NewWriter(&b)

				err := imaging.Encode(tempWriter, tile, imaging.PNG)
				if err != nil {
					return nil, err
				}

				tempWriter.Flush()

				meta.Mapping[fmt.Sprintf("%d_%d_%d", levelCounter, x, y)] = []uint64{byteCursor, byteCursor + uint64(b.Len())}
				byteCursor += uint64(b.Len())

				// Copy to upload stream
				_, err = io.Copy(writer, bufio.NewReader(&b))
				if err != nil {
					return nil, err
				}

				fmt.Printf("\rWrote Tile %d %dx%d", level, x+1, y+1)
			}
		}

		levelCounter++
	}

	writer.Close()

	// Wait for the upload to complete
	err := <-uploadChan
	if err != nil {
		return nil, err
	}

	jsonBytes, err := json.Marshal(meta)
	if err != nil {
		return nil, err
	}

	_, err = minioClient.PutObject("dd-files", id+".json", bytes.NewReader(jsonBytes), int64(len(jsonBytes)), minio.PutObjectOptions{
		ContentType: "application/json",
	})
	if err != nil {
		return nil, err
	}

	return &meta, nil
}

func packFile(file multipart.File) (*MapMetadata, error) {
	img, err := imaging.Decode(file)
	if err != nil {
		return nil, err
	}

	id := uuid.NewV4()
	if err != nil {
		return nil, err
	}

	meta, err := pack(img, id.String())
	if err != nil {
		return nil, err
	}

	return meta, nil
}

