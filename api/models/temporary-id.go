package models
// TemporaryID is a temporary id
type TemporaryID struct {
	ID     string `db:"id"`
	Type   string `db:"type"`
	UserID string `db:"user_id"`
}

