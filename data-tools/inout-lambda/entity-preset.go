package main

import "upper.io/db.v3/postgresql"

type EntityPreset struct {
	Name               string           `db:"Name" json:"name"`
	Description        string           `db:"Description" json:"description"`
	ImageID            *string          `db:"ImageId" json:"imageId"`
	PlayerCreatable    bool             `db:"PlayerCreatable" json:"playerCreatable"`
	Attributes         postgresql.JSONB `db:"Attributes" json:"attributes"`
	IsInventoryEnabled bool             `db:"IsInventoryEnabled" json:"iie"`
	IsCurrencyEnabled  bool             `db:"IsCurrencyEnabled" json:"ice"`
	IsXPEnabled        bool             `db:"IsXPEnabled" json:"ixpe"`
	IsHealthEnabled    bool             `db:"IsHealthEnabled" json:"ihe"`
	Health             postgresql.JSONB `db:"Health" json:"health"`
	IsSpellsetsEnabled bool             `db:"IsSpellsetsEnabled" json:"ise"`
}
