package models

// User represents a row from the users table
type User struct {
	ID        string `db:"id"`
	Name      string `db:"name"`
	ImageURL  string `db:"image_url"`
	CreatedAt uint64 `db:"created_at"`
}
