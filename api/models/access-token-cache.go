package models

type AccessTokenCache struct {
	Token  string `db:"token"`
	UserID string `db:"user_id"`
}
