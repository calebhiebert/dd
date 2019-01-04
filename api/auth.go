package main

import (
	"context"
	"dd-api/rpc"
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"strings"
	"time"

	"github.com/twitchtv/twirp"
)

// Auth0Response is the response returned when asking auth0 for user info
type Auth0Response struct {
	EmailVerified bool      `json:"email_verified"`
	Email         string    `json:"email"`
	UpdatedAt     time.Time `json:"updated_at"`
	Name          string    `json:"name"`
	Picture       string    `json:"picture"`
	UserID        string    `json:"user_id"`
	Nickname      string    `json:"nickname"`
	CreatedAt     time.Time `json:"created_at"`
	Sub           string    `json:"sub"`
}

// Auth will return the auth things
func (d *DD) Auth(ctx context.Context, auth *dd.AuthRequest) (*dd.AuthResponse, error) {
	userData, err := getUserDataFromToken(auth.Token)
	if err != nil {
		return nil, err
	}

	user, err := d.GetUser(ctx, &dd.GetByIdRequest{
		Id: userData.Sub,
	})
	if err != nil {
		return nil, err
	}

	if user == nil {
		return &dd.AuthResponse{
			User: &dd.User{
				Id:        userData.Sub,
				Name:      userData.Name,
				ImageURL:  userData.Picture,
				CreatedAt: uint64(time.Now().Unix()),
			},
			ReigstrationRequired: true,
		}, nil
	} else {
		return &dd.AuthResponse{
			User:                 user,
			ReigstrationRequired: false,
		}, nil
	}
}

func getUserDataFromToken(token string) (*Auth0Response, error) {
	if strings.TrimSpace(token) == "" {
		err := twirp.NewError(twirp.InvalidArgument, "Missing token")
		return nil, err
	}

	req, err := http.NewRequest("GET", "https://panch-dd.auth0.com/userinfo", nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("Authorization", "Bearer "+token)

	client := &http.Client{
		Timeout: 6 * time.Second,
	}

	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	if res.StatusCode > 299 {
		return nil, errors.New(string(body))
	}

	var authResponse Auth0Response

	err = json.Unmarshal(body, &authResponse)
	if err != nil {
		return nil, err
	}

	return &authResponse, nil
}
