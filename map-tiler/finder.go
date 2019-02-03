package main
import (
	"encoding/json"
	"io/ioutil"
)

type MapMetadata struct {
	Mapping map[string][]uint64 `json:"m"`
	MinZoom int
	MaxZoom int
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

