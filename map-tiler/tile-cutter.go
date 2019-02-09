package main
import (
	"image"

	"github.com/chai2010/webp"
	"github.com/disintegration/imaging"
)

type Tile struct {
	Data []byte
	Z    int
	X    int
	Y    int
}

// GenerateTile makes a single tile from a tileconfig
func GenerateTile(config TileConfig, source image.Image) (Tile, error) {
	// Cut out the area that the tile will occupy from the original image
	tile := imaging.Crop(source, image.Rect(config.X1, config.Y1, config.X2, config.Y2))

	if tile.Bounds().Dx() != tile.Bounds().Dy() {
		x := tileSize
		y := tileSize

		if tile.Bounds().Dx() < tile.Bounds().Dy() {
			x = 0
		} else {
			y = 0
		}

		tile = imaging.Resize(tile, x, y, imaging.Linear)
	} else {
		// Resize the image to be the correct size for the tile
		tile = imaging.Resize(tile, tileSize, tileSize, imaging.Linear)
	}

	data, err := webp.EncodeLosslessRGB(tile)
	if err != nil {
		return Tile{}, err
	}

	return Tile{
		Z:    config.ZoomLevel,
		X:    config.TileX,
		Y:    config.TileY,
		Data: data,
	}, nil
}

