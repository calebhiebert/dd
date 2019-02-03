package main

import (
	"encoding/json"
	"io/ioutil"
)

func getMapping() (map[string][]uint64, error) {
	indexJSON, err := ioutil.ReadFile("./out/packed.index.json")
	if err != nil {
		return nil, err
	}

	mapping := make(map[string][]uint64)

	err = json.Unmarshal(indexJSON, &mapping)
	if err != nil {
		return nil, err
	}

	return mapping, nil
}
