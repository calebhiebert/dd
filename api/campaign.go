package main

import (
	"context"
	"dd-api/rpc"
)

// GetCampaign returns a campaign object in full
func (d *DD) GetCampaign(ctx context.Context, qr *dd.GetByIdRequest) (*dd.Campaign, error) {
	return nil, nil
}

// GetCampaigns returns paginated or sorted campaigns
func (d *DD) GetCampaigns(ctx context.Context, qr *dd.GetCampaignsRequest) (*dd.GetCampaignsResponse, error) {
	return nil, nil
}

// CreateCampaign generates a valid id for a blank campaign that can be edited
func (d *DD) CreateCampaign(ctx context.Context, qr *dd.CreateCampaignRequest) (*dd.CreateCampaignResponse, error) {
	return nil, nil
}

// EditCampaign edits a campaign object
func (d *DD) EditCampaign(ctx context.Context, qr *dd.EditCampaignRequest) (*dd.CampaignCore, error) {
	return nil, nil
}
