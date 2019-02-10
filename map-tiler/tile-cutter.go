package main

import (
	"image"
	"image/color"

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

	if config.TileGravity != GravityNone {
		x := tileSize
		y := tileSize

		if tile.Bounds().Dx() < tile.Bounds().Dy() {
			x = 0
		} else {
			y = 0
		}

		tile = imaging.Resize(tile, x, y, imaging.Linear)

		var pasteX, pasteY int

		switch config.TileGravity {
		case GravityTop:
			pasteY = tileSize - tile.Bounds().Dy()
		case GravityLeft:
			pasteX = tileSize - tile.Bounds().Dx()
		}

		fullSizeTile := imaging.New(tileSize, tileSize, color.NRGBA{221, 221, 221, 255})
		tile = imaging.Paste(fullSizeTile, tile, image.Point{X: pasteX, Y: pasteY})
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
