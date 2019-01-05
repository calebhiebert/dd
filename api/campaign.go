package main

import (
	"context"
	"dd-api/dd"
	"dd-api/models"
	"fmt"

	"github.com/twitchtv/twirp"

	db "upper.io/db.v3"
	"upper.io/db.v3/postgresql"
)

// GetCampaign returns a campaign object in full
func (d *DD) GetCampaign(ctx context.Context, qr *dd.GetByIdRequest) (*dd.Campaign, error) {
	if ctx.Value("userId") == nil {
		return nil, twirp.NewError(twirp.Unauthenticated, "login missing")
	}

	tmpID, err := getTempID(qr.Id, IDTypeCampaign)
	if err != nil {
		return nil, err
	}

	if tmpID != nil {
		return &dd.Campaign{
			Id:              qr.Id,
			ExperienceTable: []int64{},
		}, nil
	}

	var campaign models.Campaign

	err = dbase.SelectFrom("campaigns").
		Where("id = ?", qr.Id).
		One(&campaign)
	if err == db.ErrNoMoreRows {
		return nil, twirp.NewError(twirp.NotFound, "campaign does not exist")
	} else if err != nil {
		return nil, err
	}

	fmt.Println(campaign)

	return &dd.Campaign{
		Id:              campaign.ID,
		Name:            campaign.Name,
		Description:     campaign.Description,
		ImageId:         campaign.ImageID,
		ExperienceTable: campaign.ExperienceTable,
		EntityPresets:   []*dd.EntityPreset{},
	}, nil
}

// GetCampaigns returns paginated or sorted campaigns
func (d *DD) GetCampaigns(ctx context.Context, qr *dd.GetCampaignsRequest) (*dd.GetCampaignsResponse, error) {
	if ctx.Value("userId") == nil {
		return nil, twirp.NewError(twirp.Unauthenticated, "login missing")
	}

	var campaigns []models.Campaign

	err := dbase.SelectFrom("campaigns").All(&campaigns)
	if err != nil {
		return nil, err
	}

	var mappedCampaigns []*dd.CampaignCore

	for _, c := range campaigns {
		mappedCampaigns = append(mappedCampaigns, &dd.CampaignCore{
			Id:              c.ID,
			Name:            c.Name,
			Description:     c.Description,
			ImageId:         c.ImageID,
			ExperienceTable: c.ExperienceTable,
		})
	}

	return &dd.GetCampaignsResponse{
		Campaigns: mappedCampaigns,
		Total:     5,
	}, nil
}

// CreateCampaign generates a valid id for a blank campaign that can be edited
func (d *DD) CreateCampaign(ctx context.Context, qr *dd.CreateCampaignRequest) (*dd.CreateCampaignResponse, error) {
	if ctx.Value("userId") == nil {
		return nil, twirp.NewError(twirp.Unauthenticated, "login missing")
	}

	tempID, err := genTempID(ctx.Value("userId").(string), IDTypeCampaign)
	if err != nil {
		return nil, err
	}

	return &dd.CreateCampaignResponse{
		Id: tempID.ID,
	}, nil
}

// EditCampaign edits a campaign object
func (d *DD) EditCampaign(ctx context.Context, qr *dd.EditCampaignRequest) (*dd.CampaignCore, error) {
	if ctx.Value("userId") == nil {
		return nil, twirp.NewError(twirp.Unauthenticated, "login missing")
	}

	fmt.Printf("%+v\n", qr)

	res, err := dbase.Update("campaigns").
		Set("name = ?", qr.Campaign.Name).
		Set("description = ?", qr.Campaign.Description).
		Set("image_id = ?", qr.Campaign.ImageId).
		Set("xp_table = ?", postgresql.Array(qr.Campaign.ExperienceTable)).
		Where("id = ?", qr.Id).
		Exec()
	if err != nil {
		return nil, err
	}

	rowsAffected, _ := res.RowsAffected()

	if rowsAffected == 0 {
		_, err = dbase.InsertInto("campaigns").
			Columns("id", "name", "description", "image_id", "xp_table", "user_id").
			Values(qr.Id,
				qr.Campaign.Name,
				qr.Campaign.Description,
				qr.Campaign.ImageId,
				postgresql.Array(qr.Campaign.ExperienceTable),
				ctx.Value("userId").(string),
			).Exec()
		if err != nil {
			return nil, err
		}
	}

	err = clearTempID(qr.Id)
	if err != nil {
		return nil, err
	}

	fmt.Println("ROWS AFFECTED", rowsAffected)

	return qr.Campaign, nil
}
