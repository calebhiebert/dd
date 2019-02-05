package main

import (
	"context"
	"fmt"

	tiler "map-tiler"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	err := tiler.MakeTiles(context.Background(), tiler.GCSEvent{
		Bucket: "dd-map-tiler",
		Name:   "large.png",
	})
	fmt.Println(err)
}
