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
		Bucket: "dd-map-tiles-ingest",
		Name:   "9cba79f5-ea78-441f-ab08-52f59535919e",
	})
	fmt.Println(err)
}
