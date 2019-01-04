package main

import (
	"upper.io/db.v3/lib/sqlbuilder"
	"upper.io/db.v3/postgresql"
)

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

	migrate()

	return nil
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
