package main
import (
	"context"
	"dd-api/dd"
	"dd-api/models"
	"time"

	"github.com/twitchtv/twirp"
	db "upper.io/db.v3"
)

// GetUser will return the user for a given id
func (d *DD) GetUser(ctx context.Context, gu *dd.GetByIdRequest) (*dd.User, error) {
	var user models.User

	err := dbase.SelectFrom("users").Where("id = ?", gu.Id).One(&user)
	if err == db.ErrNoMoreRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}

	return &dd.User{
		Id:        user.ID,
		Name:      user.Name,
		ImageURL:  user.ImageURL,
		CreatedAt: user.CreatedAt,
	}, nil
}

func (d *DD) Me(ctx context.Context, gu *dd.Blank) (*dd.User, error) {
	if ctx.Value("userId") == nil {
		return nil, twirp.NewError(twirp.Unauthenticated, "Authentication missing")
	}

	userId := ctx.Value("userId").(string)

	user, err := d.GetUser(ctx, &dd.GetByIdRequest{
		Id: userId,
	})
	if err != nil {
		return nil, err
	}

	if user != nil {
		return user, nil
	}

	return nil, twirp.NewError(twirp.NotFound, "user missing")
}

// CreateUser will create a new user
func (d *DD) CreateUser(ctx context.Context, cu *dd.CreateUserRequest) (*dd.User, error) {
	userData, err := getUserDataFromToken(cu.Token)
	if err != nil {
		return nil, err
	}

	existingUser, err := d.GetUser(ctx, &dd.GetByIdRequest{
		Id: userData.Sub,
	})
	if err != nil {
		return nil, err
	}

	if existingUser != nil {
		return nil, twirp.InvalidArgumentError("user", "user already exists")
	}

	_, err = dbase.InsertInto("users").
		Columns("id", "name", "image_url").
		Values(userData.Sub, cu.Username, userData.Picture).
		Exec()
	if err != nil {
		return nil, err
	}

	return &dd.User{
		Id:        userData.Sub,
		Name:      cu.Username,
		ImageURL:  userData.Picture,
		CreatedAt: uint64(time.Now().Unix()),
	}, nil
}

