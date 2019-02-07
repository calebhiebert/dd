package tiler

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"image"
	"io/ioutil"
	"math"
	"net/http"
	"os"
	"time"

	"github.com/avast/retry-go"
	minio "github.com/minio/minio-go"
)

var tileConfigsPerWorker = 325
var maxConcurrentWorkers = 15

// MapMetadata stores information about a map
type MapMetadata struct {
	ID      string  `json:"id"`
	Mapping Mapping `json:"mapping"`
	MinZoom int     `json:"minZoom"`
	MaxZoom int     `json:"maxZoom"`
}

type ProcessingRequest struct {
	ID     string       `json:"id"`
	Bucket string       `json:"bucket"`
	Tiles  []TileConfig `json:"tiles"`
}

// Mapping contains data about tiles
type Mapping map[string][]int

// TileConfig configuration for cutting out a tile
type TileConfig struct {
	ZoomLevel int `json:"z"`
	ZoomSize  int `json:"s"`
	X1        int `json:"x"`
	X2        int `json:"x2"`
	Y1        int `json:"y"`
	Y2        int `json:"y2"`
	TileX     int `json:"tx"`
	TileY     int `json:"ty"`
}

// pack will pack up the image and upload it to s3
func pack(src image.Image, id, bucket string) (*MapMetadata, error) {
	img := GetImageDetails(src)
	tileConfigs := GetTileConfig(src)

	jbytez, _ := json.Marshal(tileConfigs[:100])

	ioutil.WriteFile("./json.json", jbytez, os.ModePerm)

	workerCount := math.Ceil(float64(len(tileConfigs)) / float64(tileConfigsPerWorker))
	workerResponses := make(chan ProcessingResponse, int(workerCount))
	workerErrors := []error{}
	workerSem := make(chan bool, maxConcurrentWorkers)

	fmt.Println("Running with", workerCount, "workers for", len(tileConfigs), "tiles")

	for w := 0; w < int(workerCount); w++ {
		workerSem <- true

		configs := tileConfigs[w*tileConfigsPerWorker : int(math.Min(float64(len(tileConfigs)), float64((w+1)*tileConfigsPerWorker)))]

		go func(cfgs []TileConfig, worker int) {
			defer func() { <-workerSem }()
			fmt.Println("Starting worker", worker)

			var res ProcessingResponse

			err := retry.Do(func() error {
				response, err := processTilesExternal(ProcessingRequest{
					ID:     id,
					Bucket: bucket,
					Tiles:  cfgs,
				})
				if err != nil {
					return err
				}

				res = response
				return nil
			}, retry.OnRetry(func(n uint, err error) {
				fmt.Printf("Retrying worker %d: attempt %d, err: %+v\n", worker, n, err)
			}))
			if err != nil {
				workerErrors = append(workerErrors, err)
				fmt.Printf("Worker (%d) failed. %+v", worker, err)
			} else {
				fmt.Printf("Worker Done (%d) %.0f\n", worker, workerCount)
				workerResponses <- res
			}

		}(configs, w)
	}

	for i := 0; i < maxConcurrentWorkers; i++ {
		workerSem <- true
	}

	responses := []ProcessingResponse{}
	for w := 0; w < int(workerCount); w++ {
		responses = append(responses, <-workerResponses)
	}

	if len(workerErrors) != 0 {
		return nil, errors.New("Stopping processing due to worker error")
	}

	mapping, data, err := mergeProcessingResponses(responses...)
	if err != nil {
		return nil, err
	}

	var tileData []byte
	// Create a metadata object to store file information
	var meta MapMetadata
	meta.MaxZoom = img.maxZoomLevelPow2() - zoomLevel0Pow2
	meta.MinZoom = 0
	meta.ID = id

	meta.Mapping = mapping
	tileData = data

	fmt.Println("Starting Upload", len(tileData))

	_, err = s3.PutObject(bucketName, id+".map", bytes.NewReader(tileData), -1, minio.PutObjectOptions{
		ContentType: "application/x-packmap",
	})
	if err != nil {
		return nil, err
	}

	fmt.Println("Upload Complete")

	// Serialize the meta object
	jsonBytes, err := json.Marshal(meta)
	if err != nil {
		return nil, err
	}

	// Upload the meta object to s3 as well
	_, err = s3.PutObject(bucketName, id+".json", bytes.NewReader(jsonBytes), int64(len(jsonBytes)), minio.PutObjectOptions{
		ContentType: "application/json",
	})
	if err != nil {
		return nil, err
	}

	return &meta, nil
}

func processTiles(src image.Image, tileConfigs []TileConfig) (Mapping, []byte, error) {
	fmt.Println("Processing Tiles", len(tileConfigs))

	sem := make(chan int, 4)
	tiles := make(chan Tile, len(tileConfigs))

	byteCursor := 0

	for _, tile := range tileConfigs {
		sem <- 1
		go func(tile TileConfig, src image.Image) {
			t, err := GenerateTile(tile, src)
			if err != nil {
				fmt.Println(err)
			}

			tiles <- t
			<-sem
		}(tile, src)
	}

	// Wait for rest of semaphore
	for i := 0; i < cap(sem); i++ {
		sem <- 1
	}

	close(tiles)

	packData := []byte{}
	mapping := Mapping{}

	for t := range tiles {
		mapping[fmt.Sprintf("%d_%d_%d", t.Z, t.X, t.Y)] = []int{byteCursor, byteCursor + len(t.Data)}
		packData = append(packData, t.Data...)
		byteCursor += len(t.Data)
	}

	return mapping, packData, nil
}

func processTilesExternal(req ProcessingRequest) (ProcessingResponse, error) {
	client := &http.Client{
		Timeout: 400 * time.Second,
	}

	jsonBytes, err := json.Marshal(req)
	if err != nil {
		return ProcessingResponse{}, err
	}

	httpRequest, err := http.NewRequest("POST", os.Getenv("EXTERNAL_PROC_URL"), bytes.NewReader(jsonBytes))
	if err != nil {
		return ProcessingResponse{}, err
	}

	resp, err := client.Do(httpRequest)
	if err != nil {
		return ProcessingResponse{}, err
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return ProcessingResponse{}, err
	}

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return ProcessingResponse{}, errors.New(string(body))
	}

	var procResponse ProcessingResponse

	err = json.Unmarshal(body, &procResponse)
	if err != nil {
		return ProcessingResponse{}, err
	}

	return procResponse, nil
}

func mergeProcessingResponses(procResponses ...ProcessingResponse) (Mapping, []byte, error) {
	mapping := Mapping{}
	data := []byte{}

	byteCursor := 0

	for _, res := range procResponses {
		byteData, err := base64.StdEncoding.DecodeString(res.Data)
		if err != nil {
			return nil, nil, err
		}

		data = append(data, byteData...)

		for k, v := range res.Mapping {
			mapping[k] = []int{v[0] + byteCursor, v[1] + byteCursor}
		}

		byteCursor += len(byteData)
	}

	return mapping, data, nil
}
