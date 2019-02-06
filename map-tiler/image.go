package tiler
import (
	"fmt"
	"image"
	"math"
)

// ImageDetails contains verious helpers to calculate image things
type ImageDetails struct {
	Height int
	Width  int
}

func (d ImageDetails) topDimension() int {
	return int(math.Max(float64(d.Height), float64(d.Width)))
}

func (d ImageDetails) maxZoomLevelPow2() int {
	zoomLevelPow2 := zoomLevelCapPow2

	for zl := zoomLevel0Pow2; zl < zoomLevelCapPow2; zl++ {
		if int(math.Pow(2, float64(zl))) >= d.topDimension()*2 {
			zoomLevelPow2 = zl
			break
		}
	}

	return zoomLevelPow2
}

func (d ImageDetails) xLowerBound() int {
	return (d.topDimension() - d.Width) / 2
}

func (d ImageDetails) xUpperBound() int {
	return ((d.topDimension() - d.Width) / 2) + d.Width
}

func (d ImageDetails) yLowerBound() int {
	return (d.topDimension() - d.Height) / 2
}

func (d ImageDetails) yUpperBound() int {
	return ((d.topDimension() - d.Height) / 2) + d.Height
}

func GetImageDetails(img image.Image) ImageDetails {
	return ImageDetails{
		Width:  img.Bounds().Dx(),
		Height: img.Bounds().Dy(),
	}
}

// GetTileConfig returns a list of all tiles that need to be made
func GetTileConfig(source image.Image) []TileConfig {
	img := GetImageDetails(source)
	tileConfigs := []TileConfig{}

	for z := zoomLevel0Pow2; z < img.maxZoomLevelPow2(); z++ {
		zoomSize := int(math.Pow(2, float64(z)))

		xTiles := zoomSize / tileSize
		yTiles := zoomSize / tileSize

		// the ratio will convert between "tile size" and the actual size of the image
		ratio := float64(img.topDimension()) / float64(zoomSize)

		fmt.Println(zoomSize, xTiles, yTiles, ratio, z, img.maxZoomLevelPow2())

		// Cut out the tiles
		for x := 0; x < xTiles; x++ {
			for y := 0; y < yTiles; y++ {

				// Compute the corner points for the tile
				x1 := float64(x * tileSize)
				y1 := float64(y * tileSize)
				x2 := float64((x + 1) * tileSize)
				y2 := float64((y + 1) * tileSize)

				// Skip tile generation if the tile is outside the bounds
				if int(math.Ceil(x2*ratio)) < img.xLowerBound() ||
					int(math.Floor(x1*ratio)) > img.xUpperBound() ||
					int(math.Ceil(y2*ratio)) < img.yLowerBound() ||
					int(math.Floor(y1*ratio)) > img.yUpperBound() {
					continue
				}

				tileConfigs = append(tileConfigs, TileConfig{
					ZoomLevel: z - zoomLevel0Pow2,
					ZoomSize:  zoomSize,
					X1:        int(x1 * ratio),
					X2:        int(x2 * ratio),
					Y1:        int(y1 * ratio),
					Y2:        int(y2 * ratio),
					TileX:     x,
					TileY:     y,
				})
			}
		}
	}

	return tileConfigs
}

