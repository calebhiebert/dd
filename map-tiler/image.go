package main
import (
	"fmt"
	"image"
	"math"

	"github.com/disintegration/imaging"
	minio "github.com/minio/minio-go"
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

// GetImageDetails Returns an interface that can be used to calculate image details
func GetImageDetails(img image.Image) ImageDetails {
	return ImageDetails{
		Width:  img.Bounds().Dx(),
		Height: img.Bounds().Dy(),
	}
}

// GetTileConfig returns a list of all tiles that need to be made
func GetTileConfig(details ImageDetails) []TileConfig {
	tileConfigs := []TileConfig{}

	for z := zoomLevel0Pow2; z < details.maxZoomLevelPow2()+1; z++ {
		zoomSize := int(math.Pow(2, float64(z)))

		xTiles := zoomSize / tileSize
		yTiles := zoomSize / tileSize

		// the ratio will convert between "tile size" and the actual size of the image
		ratio := float64(details.topDimension()) / float64(zoomSize)

		fmt.Printf("%d (%.2f) %dx%d\n", zoomSize, ratio, xTiles, yTiles)

		// Cut out the tiles
		for x := 0; x < xTiles; x++ {
			for y := 0; y < yTiles; y++ {

				// Compute the corner points for the tile
				x1 := float64(x * tileSize)
				y1 := float64(y * tileSize)
				x2 := float64((x + 1) * tileSize)
				y2 := float64((y + 1) * tileSize)

				// Skip tile generation if the tile is outside the bounds
				if int(math.Ceil(x2*ratio)) < details.xLowerBound() ||
					int(math.Floor(x1*ratio)) > details.xUpperBound() ||
					int(math.Ceil(y2*ratio)) < details.yLowerBound() ||
					int(math.Floor(y1*ratio)) > details.yUpperBound() {
					continue
				}

				tileConfigs = append(tileConfigs, TileConfig{
					ZoomLevel: z - zoomLevel0Pow2,
					ZoomSize:  zoomSize,
					X1:        int(x1*ratio) - details.xLowerBound(),
					X2:        int(x2*ratio) - details.xLowerBound(),
					Y1:        int(y1*ratio) - details.yLowerBound(),
					Y2:        int(y2*ratio) - details.yLowerBound(),
					TileX:     x,
					TileY:     y,
				})
			}
		}
	}

	return tileConfigs
}

// GetPreparedImage Downloads an image from an S3 bucket and prepares it for processing
func GetPreparedImage(id, bucket string) (image.Image, error) {
	obj, err := s3.GetObject(bucket, id, minio.GetObjectOptions{})
	if err != nil {
		return nil, err
	}
	defer obj.Close()

	// Decode the image
	img, err := imaging.Decode(obj)
	if err != nil {
		return nil, err
	}

	return img, nil
}

