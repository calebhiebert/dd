package main
import (
	"net/http"

	tiler "map-tiler"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	http.HandleFunc("/", tiler.ProcessTileList)
	http.ListenAndServe(":8080", nil)
}

