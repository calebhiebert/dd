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
		Name:   "1bb8ab4a-1b8f-43ba-a989-421f6fb185ba",
	})
	fmt.Println(err)
}

