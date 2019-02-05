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
		Name:   "05ef2c7d-5ddd-48c3-846a-550e2c5b8520",
	})
	fmt.Println(err)
}

