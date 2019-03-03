package main

import (
	"archive/zip"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"upper.io/db.v3/postgresql"
)

var settings = postgresql.ConnectionURL{
	Host:     "localhost",
	Database: "dd",
	User:     "dd",
	Password: "dd",
}

func main() {
	sess, err := postgresql.Open(settings)
	if err != nil {
		panic(err)
	}
	defer sess.Close()

	r := gin.Default()

	r.GET("/test", func(c *gin.Context) {
		var items []Item
		var spells []Spell
		var entityPresets []EntityPreset
		var imageIDList []string

		err := sess.SelectFrom("Items").OrderBy("Name").Where("\"CampaignId\" = ?", "6745f9ca-77c5-4abb-aa1c-b1e04e83dd8f").All(&items)
		if err != nil {
			panic(err)
		}

		err = sess.SelectFrom("Spells").OrderBy("Name").Where("\"CampaignId\" = ?", "6745f9ca-77c5-4abb-aa1c-b1e04e83dd8f").All(&spells)
		if err != nil {
			panic(err)
		}

		err = sess.SelectFrom("EntityPresets").OrderBy("Name").Where("\"CampaignId\" = ?", "6745f9ca-77c5-4abb-aa1c-b1e04e83dd8f").All(&entityPresets)
		if err != nil {
			panic(err)
		}

		file, err := os.OpenFile("./out.zip", os.O_CREATE|os.O_WRONLY, os.ModePerm)
		if err != nil {
			panic(err)
		}

		w := zip.NewWriter(file)

		for _, item := range items {
			if item.ImageID != nil {
				imageIDList = append(imageIDList, *item.ImageID)
			}
		}

		for _, spell := range spells {
			if spell.ImageID != nil {
				imageIDList = append(imageIDList, *spell.ImageID)
			}
		}

		for _, ep := range entityPresets {
			if ep.ImageID != nil {
				imageIDList = append(imageIDList, *ep.ImageID)
			}

			attrs := ep.Attributes.V.([]interface{})

			for _, attr := range attrs {
				a := attr.(map[string]interface{})
				imgID, ok := a["ImageId"]
				if ok && imgID != nil {
					imageIDList = append(imageIDList, imgID.(string))
				}

			}
		}

		for _, imgID := range imageIDList {
			pic, err := getImage(imgID)
			if err != nil {
				panic(err)
			}

			f, err := w.Create(pic.Filename)
			if err != nil {
				panic(err)
			}

			_, err = f.Write(pic.Data)
			if err != nil {
				panic(err)
			}
		}

		// Write Items
		f, err := w.Create("items.json")
		if err != nil {
			panic(err)
		}

		json.NewEncoder(f).Encode(items)

		// Write Spells
		f, err = w.Create("spells.json")
		if err != nil {
			panic(err)
		}

		json.NewEncoder(f).Encode(spells)

		// Write Entity Presets
		f, err = w.Create("entity-presets.json")
		if err != nil {
			panic(err)
		}

		json.NewEncoder(f).Encode(entityPresets)

		// Write Meta
		f, err = w.Create("meta.json")
		if err != nil {
			panic(err)
		}

		json.NewEncoder(f).Encode(&Meta{
			Version:    "0.1",
			ExportDate: time.Now().String(),
		})

		w.Close()
		file.Close()

		c.JSON(200, gin.H{})
	})

	r.Run()
}

func getImage(id string) (*Image, error) {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	res, err := client.Get(fmt.Sprintf("https://res.cloudinary.com/dqhk8k6iv/image/upload/v1551406752/%s", id))
	if err != nil {
		return nil, err
	}

	fmt.Println(res.Header.Get("Content-Type"))

	if res.StatusCode < 200 || res.StatusCode >= 300 {
		return nil, errors.New("Invalid response code")
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	return &Image{
		Data:     body,
		Filename: id + ".jpg",
	}, nil
}

type Image struct {
	Data     []byte
	Filename string
}
