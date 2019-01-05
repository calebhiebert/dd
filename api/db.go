package main

import (
	"dd-api/models"

	"github.com/matoous/go-nanoid"
	db "upper.io/db.v3"
	"upper.io/db.v3/lib/sqlbuilder"
	"upper.io/db.v3/postgresql"
)

var IDTypeCampaign = "campaign"
var IDTypeEntityPreset = "ent_preset"

var dbase sqlbuilder.Database

func connectDB() error {
	sess, err := postgresql.Open(postgresql.ConnectionURL{
		Host:     "localhost",
		Database: "dd",
		User:     "dd",
		Password: "dd",
	})
	if err != nil {
		return err
	}

	dbase = sess

	return migrate()
}

func migrate() error {
	sql, err := fileBox.FindString("schema.sql")
	if err != nil {
		return err
	}

	_, err = dbase.Exec(sql)
	if err != nil {
		return err
	}

	return nil
}

func clearTempID(id string) error {
	_, err := dbase.DeleteFrom("temporary_ids").
		Where("id = ?", id).
		Exec()

	return err
}

func getTempID(id, idType string) (*models.TemporaryID, error) {
	var tempID models.TemporaryID

	err := dbase.SelectFrom("temporary_ids").
		Where("id = ?", id).And("type = ?", idType).
		One(&tempID)
	if err == db.ErrNoMoreRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}

	return &tempID, nil
}

func genTempID(userID, idType string) (models.TemporaryID, error) {
	var tempID models.TemporaryID

	id, err := gonanoid.Nanoid(16)
	if err != nil {
		return tempID, err
	}

	_, err = dbase.InsertInto("temporary_ids").
		Columns("id", "type", "user_id").
		Values(id, idType, userID).
		Exec()
	if err != nil {
		return tempID, err
	}

	return models.TemporaryID{
		ID:     id,
		Type:   idType,
		UserID: userID,
	}, nil
}
