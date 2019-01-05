package models
import "upper.io/db.v3/postgresql"

// EntityPreset represents a row in the entity_presets table
type EntityPreset struct {
	ID              string                `db:"id"`
	Name            string                `db:"name"`
	Description     string                `db:"description"`
	UserID          string                `db:"user_id"`
	ImageID         string                `db:"image_id"`
	PlayerCreatable bool                  `db:"player_creatable"`
	CampaignID      string                `db:"campaign_id"`
	Attributes      postgresql.JSONBArray `db:"attributes"`
	Inventory       postgresql.JSONB      `db:"inventory"`
	Health          postgresql.JSONB      `db:"health"`
}

