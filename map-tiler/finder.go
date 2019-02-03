package main
import (
	"encoding/json"
	"io/ioutil"
)

type MapMetadata struct {
	ID      string              `json:"id"`
	Mapping map[string][]uint64 `json:"mapping"`
	MinZoom int                 `json:"minZoom"`
	MaxZoom int                 `json:"maxZoom"`
}

func getMapping() (*MapMetadata, error) {
	indexJSON, err := ioutil.ReadFile("./out/packed.index.json")
	if err != nil {
		return nil, err
	}

	var mapping MapMetadata

	err = json.Unmarshal(indexJSON, &mapping)
	if err != nil {
		return nil, err
	}

	return &mapping, nil
}

