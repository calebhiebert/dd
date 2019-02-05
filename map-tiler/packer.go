package tiler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"image"
	"image/color"
	"image/png"
	"io"
	"math"

	"github.com/disintegration/imaging"
	minio "github.com/minio/minio-go"
)

// MapMetadata stores information about a map
type MapMetadata struct {
	ID      string              `json:"id"`
	Mapping map[string][]uint64 `json:"mapping"`
	MinZoom int                 `json:"minZoom"`
	MaxZoom int                 `json:"maxZoom"`
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

type EncodedTile struct {
	ZoomLevel int
	X         int
	Y         int
	Data      []byte
}

var zoomLevels = []int{256, 512, 1024, 2048, 4096, 8192, 16384}
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

	fmt.Println("Initial processing completed")

	tileConfigs := []TileConfig{}
	var levelCounter int

	// Do tile math
	for _, level := range zoomLevels[:maxZoomLevel+1] {
		// Calculate the max number of tiles to be generated
		xTiles := level / tileSize
		yTiles := level / tileSize

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

				tileConfigs = append(tileConfigs, TileConfig{
					ZoomLevel: levelCounter,
					ZoomSize:  level,
					X1:        int(x1 * ratio),
					X2:        int(x2 * ratio),
					Y1:        int(y1 * ratio),
					Y2:        int(y2 * ratio),
					TileX:     x,
					TileY:     y,
				})
			}
		}

		levelCounter++
	}

	fmt.Printf("Planned to process %d tiles\n", len(tileConfigs))

	// Create a metadata object to store file information
	var meta MapMetadata
	meta.Mapping = make(map[string][]uint64)
	meta.MaxZoom = maxZoomLevel
	meta.MinZoom = 0
	meta.ID = id

	// Create a new square image and paste the old one into it
	boxImage := imaging.New(topDimension, topDimension, color.NRGBA{0, 0, 0, 0})
	src = imaging.PasteCenter(boxImage, src)

	sem := make(chan int, 4)
	processedTiles := make(chan *EncodedTile, 15)

	// Make an upload channel to allow for waiting during the upload process
	uploadChan := make(chan error)

	reader, writer := io.Pipe()

	// Upload the object stream to s3 in parallel
	go func(uploadChan chan error) {
		_, err := s3.PutObject(bucketName, id+".map", reader, -1, minio.PutObjectOptions{
			ContentType: "application/x-packmap",
		})

		uploadChan <- err

		if err != nil {
			panic(err)
		}
	}(uploadChan)

	// Copy completed tiles to the output
	go func() {
		var byteCursor uint64

		for encodedTile := range processedTiles {
			dataLength := uint64(len(encodedTile.Data))

			meta.Mapping[fmt.Sprintf("%d_%d_%d", encodedTile.ZoomLevel, encodedTile.X, encodedTile.Y)] = []uint64{byteCursor, byteCursor + dataLength}
			_, err := io.Copy(writer, bytes.NewReader(encodedTile.Data))
			if err != nil {
				fmt.Println(err)
			}

			byteCursor += dataLength
		}

		writer.Close()
	}()

	currentTile := 0

	// Process the tiles and send output to the output channel
	for _, tile := range tileConfigs {
		sem <- 1

		go func() {
			config, err := encodeTile(&src, &tile)
			if err != nil {
				fmt.Println("Encoding Error", err)
			} else {
				processedTiles <- config
			}

			currentTile++
			fmt.Printf("\rProgress: %f", (float64(currentTile) / float64(len(tileConfigs)) * 100))

			<-sem
		}()
	}

	// Wait for rest of semaphore
	for i := 0; i < cap(sem); i++ {
		sem <- 1
	}

	close(processedTiles)

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

func encodeTile(source *image.Image, config *TileConfig) (*EncodedTile, error) {
	// Cut out the area that the tile will occupy from the original image
	tile := imaging.Crop(*source, image.Rect(config.X1, config.Y1, config.X2, config.Y2))

	// Resize the image to be the correct size for the tile
	tile = imaging.Resize(tile, tileSize, tileSize, imaging.Linear)

	// Create a buffer to hold the encoded tile
	var b bytes.Buffer

	// Encode the image into the buffer
	err := imaging.Encode(&b, tile, imaging.PNG, imaging.PNGCompressionLevel(png.BestCompression))
	if err != nil {
		return nil, err
	}

	return &EncodedTile{
		ZoomLevel: config.ZoomLevel,
		X:         config.TileX,
		Y:         config.TileY,
		Data:      b.Bytes(),
	}, nil
}
