package main

import (
	"context"
	"fmt"
	"net/http"

	"dd-api/dd"

	packr "github.com/gobuffalo/packr/v2"
	"github.com/twitchtv/twirp"
)

var fileBox *packr.Box

// DD is the main twirp instance
type DD struct{}

// CorsResponder is a custom implimentation of cors over twirp
type CorsResponder struct {
	passthrough dd.TwirpServer
}

func (c *CorsResponder) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")

	if authHeader != "" {
		token := string([]rune(authHeader[len("Bearer "):]))

		userId, err := getTokenCache(token)
		if err != nil {
			fmt.Println("TOKEN CACHE ERR", err)
		}

		if userId != nil {
			r = r.WithContext(context.WithValue(r.Context(), "userId", *userId))
		} else {
			userData, err := getUserDataFromToken(token)
			if err != nil {
				fmt.Println("USER DATA ERR", err)
			}

			if userData != nil {
				err = cacheToken(token, userData.Sub)
				if err != nil {
					fmt.Println("CACHE ERR", err)
				} else {
					r = r.WithContext(context.WithValue(r.Context(), "userId", userData.Sub))
				}
			}

		}
	}

	if r.Method == "OPTIONS" {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type,Authorization")
		w.Header().Add("Access-Control-Max-Age", "86400")
		w.WriteHeader(http.StatusOK)
	} else {
		c.passthrough.ServeHTTP(w, r)
	}
}

func main() {
	server := &DD{}

	fileBox = packr.New("FileBox", "./assets")

	err := connectDB()
	if err != nil {
		panic(err)
	}

	twirpHandler := dd.NewDDServer(server, &twirp.ServerHooks{
		RequestReceived: func(ctx context.Context) (context.Context, error) {
			err := twirp.SetHTTPResponseHeader(ctx, "Access-Control-Allow-Origin", "*")
			if err != nil {
				return ctx, twirp.InternalErrorWith(err)
			}

			err = twirp.SetHTTPResponseHeader(ctx, "Access-Control-Allow-Methods", "POST, GET, OPTIONS")
			if err != nil {
				return ctx, twirp.InternalErrorWith(err)
			}

			err = twirp.SetHTTPResponseHeader(ctx, "Access-Control-Allow-Headers", "Content-Type,Authorization")
			if err != nil {
				return ctx, twirp.InternalErrorWith(err)
			}

			err = twirp.SetHTTPResponseHeader(ctx, "Access-Control-Max-Age", "86400")
			if err != nil {
				return ctx, twirp.InternalErrorWith(err)
			}

			return ctx, nil
		},
	})

	cors := &CorsResponder{
		passthrough: twirpHandler,
	}

	http.ListenAndServe(":8080", cors)
}
