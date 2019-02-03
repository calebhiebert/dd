package main
import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"image"
	"image/color"
	"io"
	"io/ioutil"
	"math"
	"os"
	"time"

	"github.com/disintegration/imaging"
)

var zoomLevels = []int{256, 512, 1024, 2048, 4096, 8192, 16384, 16384 * 2}
var tileSize = 256

func pack() error {
	start := time.Now().UnixNano()

	src, err := imaging.Open("./large.png")
	if err != nil {
		return err
	}

	imageHeight := src.Bounds().Dy()
	imageWidth := src.Bounds().Dx()

	topDimension := int(math.Max(float64(imageHeight), float64(imageWidth)))

	maxZoomLevel := 0

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

	packFile, err := os.OpenFile("./out/packed.map", os.O_CREATE|os.O_WRONLY, os.ModePerm)
	if err != nil {
		return err
	}

	index := make(map[string][]uint64)
	var byteCursor uint64
	levelCounter := 0

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
				writer := bufio.NewWriter(&b)

				err = imaging.Encode(writer, tile, imaging.PNG)
				if err != nil {
					return err
				}

				writer.Flush()

				index[fmt.Sprintf("%d_%d_%d", levelCounter, x, y)] = []uint64{byteCursor, byteCursor + uint64(b.Len())}
				byteCursor += uint64(b.Len()) + 1

				_, err = io.Copy(packFile, bufio.NewReader(&b))
				if err != nil {
					return err
				}

				fmt.Printf("\rWrote Tile %d %dx%d", level, x+1, y+1)
			}
		}

		levelCounter++
	}

	packFile.Close()

	jsonBytes, err := json.Marshal(index)
	if err != nil {
		return err
	}

	err = ioutil.WriteFile("./out/packed.index.json", jsonBytes, os.ModePerm)
	if err != nil {
		return err
	}

	return nil
}

