package main

import "upper.io/db.v3/postgresql"

// Item represents the Items db table
type Item struct {
	Name          string                 `db:"Name" json:"name"`
	Content       postgresql.JSONB       `db:"Content" json:"content"`
	PlayerVisible bool                   `db:"PlayerVisible" json:"playerVisible"`
	Tags          postgresql.StringArray `db:"Tags" json:"tags"`
	ImageID       *string                `db:"ImageId" json:"-"`
}
