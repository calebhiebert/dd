package models
import (
	"upper.io/db.v3/postgresql"
)

type ExperienceTable postgresql.Int64Array

// Campaign represents a row from the campaigns table
type Campaign struct {
	ID              string                `db:"id"`
	Name            string                `db:"name"`
	Description     string                `db:"description"`
	ImageID         string                `db:"image_id"`
	ExperienceTable postgresql.Int64Array `db:"xp_table"`
}

// func (e *ExperienceTable) MarshalDB() (interface{}, error) {
// 	return postgresql.Array(e), nil
// }

// func (e *ExperienceTable) UnmarshalDB(v interface{}) error {
// 	fmt.Println(postgresql.Array(v))

// 	postgresql.array

// 	*e = ExperienceTable{2000}

// 	return nil
// }

