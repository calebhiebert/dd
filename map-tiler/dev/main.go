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
		Name:   "748cada8-0d38-49b3-87f2-b56e8e40078f",
	})
	fmt.Println(err)
}
