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
		Name:   "c0e6c183-a64b-4cc7-a22f-5c0e40bf6d10",
	})
	fmt.Println(err)
}

