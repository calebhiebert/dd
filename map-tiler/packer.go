package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"image"
	"image/color"
	"image/png"
	"io"
	"math"
	"mime/multipart"

	"github.com/disintegration/imaging"
	minio "github.com/minio/minio-go"
	uuid "github.com/satori/go.uuid"
)

// MapMetadata stores information about a map
type MapMetadata struct {
	ID      string              `json:"id"`
	Mapping map[string][]uint64 `json:"mapping"`
	MinZoom int                 `json:"minZoom"`
	MaxZoom int                 `json:"maxZoom"`
}

var zoomLevels = []int{256, 512, 1024, 2048, 4096, 8192, 16384, 32768}
var tileSize = 256

// pack will pack up the image and upload it to s3
func pack(src image.Image, id string) (*MapMetadata, error) {

	// Extract information about the image
	imageHeight := src.Bounds().Dy()
	imageWidth := src.Bounds().Dx()

	// Get the largest dimension of the image, (this is used to make it square)
	topDimension := int(math.Max(float64(imageHeight), float64(imageWidth)))

	// Default the max zoom level to
	maxZoomLevel := len(zoomLevels) - 1

	// Pick a zoom level that is more than double the original image size
	for idx, zoom := range zoomLevels {
		if zoom > topDimension*2 {
			maxZoomLevel = idx
			break
		}
	}

	// How much space will be added on either axis to make the image square
	xDiff := topDimension - imageWidth
	yDiff := topDimension - imageHeight

	// The bounds of the image which do not need tile generation
	xLowerBound := xDiff / 2
	xUpperBound := imageWidth + (xDiff / 2)
	yLowerBound := yDiff / 2
	yUpperBound := imageHeight + (yDiff / 2)

	// Create a new square image and paste the old one into it
	boxImage := imaging.New(topDimension, topDimension, color.NRGBA{0, 0, 0, 0})
	src = imaging.PasteCenter(boxImage, src)

	// Make an upload channel to allow for waiting during the upload process
	uploadChan := make(chan error)

	reader, writer := io.Pipe()

	// Upload the object stream to s3 in parallel
	go func(uploadChan chan error) {
		_, err := minioClient.PutObject(bucketName, id+".map", reader, -1, minio.PutObjectOptions{
			ContentType: "application/x-packmap",
		})

		uploadChan <- err

		if err != nil {
			panic(err)
		}
	}(uploadChan)

	// Create a metadata object to store file information
	var meta MapMetadata

	// Create a byte cursor to store the current position of writer
	var byteCursor uint64
	var levelCounter int

	meta.Mapping = make(map[string][]uint64)
	meta.MaxZoom = maxZoomLevel
	meta.MinZoom = 0
	meta.ID = id

	// Generate the tiles
	for _, level := range zoomLevels[:maxZoomLevel+1] {
		fmt.Printf("\nProcessing zoom level %d\n", level)

		// Calculate the max number of tiles to be generated
		xTiles := level / tileSize
		yTiles := level / tileSize

		fmt.Printf("Tiles %dx%d\n", xTiles, yTiles)

		// Cut out the tiles
		for x := 0; x < xTiles; x++ {
			for y := 0; y < yTiles; y++ {

				// the ratio will convert between "tile size" and the actual size of the image
				ratio := float64(topDimension) / float64(level)

				// Compute the corner points for the tile
				x1 := float64(x * tileSize)
				y1 := float64(y * tileSize)
				x2 := float64((x + 1) * tileSize)
				y2 := float64((y + 1) * tileSize)

				// Skip tile generation if the tile is outside the bounds
				if int(math.Ceil(x2*ratio)) < xLowerBound ||
					int(math.Floor(x1*ratio)) > xUpperBound ||
					int(math.Ceil(y2*ratio)) < yLowerBound ||
					int(math.Floor(y1*ratio)) > yUpperBound {
					continue
				}

				// Cut out the area that the tile will occupy from the original image
				tile := imaging.Crop(src, image.Rect(int(x1*ratio), int(y1*ratio), int(x2*ratio), int(y2*ratio)))

				// Resize the image to be the correct size for the tile
				tile = imaging.Resize(tile, tileSize, tileSize, imaging.Linear)

				// Create a buffer to hold the encoded tile
				var b bytes.Buffer

				// Create a writer to write to the buffer
				tempWriter := bufio.NewWriter(&b)

				// Encode the image into the buffer
				err := imaging.Encode(tempWriter, tile, imaging.PNG, imaging.PNGCompressionLevel(png.BestCompression))
				if err != nil {
					return nil, err
				}

				tempWriter.Flush()

				// Create the mapping entry in the meta object
				meta.Mapping[fmt.Sprintf("%d_%d_%d", levelCounter, x, y)] = []uint64{byteCursor, byteCursor + uint64(b.Len())}

				// Incriment the byte counter
				byteCursor += uint64(b.Len())

				// Copy to the s3 upload stream
				_, err = io.Copy(writer, bufio.NewReader(&b))
				if err != nil {
					return nil, err
				}

				fmt.Printf("\rProcessed Tile %d %dx%d", level, x+1, y+1)
			}
		}

		levelCounter++
	}

	writer.Close()

	fmt.Println("Waiting for upload to complete...")

	// Wait for the upload to complete
	err := <-uploadChan
	if err != nil {
		return nil, err
	}

	// Serialize the meta object
	jsonBytes, err := json.Marshal(meta)
	if err != nil {
		return nil, err
	}

	// Upload the meta object to s3 as well
	_, err = minioClient.PutObject(bucketName, id+".json", bytes.NewReader(jsonBytes), int64(len(jsonBytes)), minio.PutObjectOptions{
		ContentType: "application/json",
	})
	if err != nil {
		return nil, err
	}

	return &meta, nil
}

// packFile takes an uploaded file and begins the tiling process
func packFile(file multipart.File) (*MapMetadata, error) {

	// Decode the image
	img, err := imaging.Decode(file)
	if err != nil {
		return nil, err
	}

	// Generate a new ID
	id := uuid.NewV4()
	if err != nil {
		return nil, err
	}

	// Pack the tiles and retrieve the meta object
	meta, err := pack(img, id.String())
	if err != nil {
		return nil, err
	}

	return meta, nil
}

