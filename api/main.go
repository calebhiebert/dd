package main

import (
	"context"
	"dd-api/rpc"
	"net/http"

	"github.com/twitchtv/twirp"
)

type DD struct{}

type CorsResponder struct {
	passthrough dd.TwirpServer
}

func (c *CorsResponder) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Add("Access-Control-Max-Age", "86400")
		w.WriteHeader(http.StatusOK)
	} else {
		c.passthrough.ServeHTTP(w, r)
	}
}

func main() {
	server := &DD{}

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

			err = twirp.SetHTTPResponseHeader(ctx, "Access-Control-Allow-Headers", "Content-Type")
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
