package main
import (
	"context"
	"dd-api/dd"
	"dd-api/models"
	"fmt"

	"github.com/twitchtv/twirp"
	db "upper.io/db.v3"
)

// GetEntityPreset returns a single entity preset
func (d *DD) GetEntityPreset(ctx context.Context, gep *dd.GetByIdRequest) (*dd.EntityPreset, error) {
	if ctx.Value("userId") == nil {
		return nil, twirp.NewError(twirp.Unauthenticated, "login missing")
	}

	fmt.Println("INPUT", gep)

	tempID, err := getTempID(gep.Id, IDTypeEntityPreset)
	if err != nil {
		return nil, err
	}

	fmt.Println("TEMP", tempID)

	if tempID != nil {
		return &dd.EntityPreset{
			Id:         tempID.ID,
			Attributes: []*dd.EntityAttribute{},
			Inventory: &dd.Inventory{
				Items: []*dd.InventoryItem{},
			},
			Health: &dd.HealthPreset{
				Mode: 0,
			},
		}, nil
	}

	var entityPreset *models.EntityPreset

	err = dbase.SelectFrom("entity_presets").
		Where("id = ?", gep.Id).
		One(&entityPreset)
	if err == db.ErrNoMoreRows {
		return nil, twirp.NewError(twirp.NotFound, "entity preset does not exist")
	} else if err != nil {
		return nil, err
	}

	return &dd.EntityPreset{
		Id:              entityPreset.ID,
		Name:            entityPreset.Name,
		Description:     entityPreset.Description,
		ImageId:         entityPreset.ImageID,
		PlayerCreatable: entityPreset.PlayerCreatable,
	}, nil
}

// CreateEntityPreset creates a id placeholder which can be used with the edit method
func (d *DD) CreateEntityPreset(ctx context.Context, b *dd.Blank) (*dd.CreateEntityPresetResponse, error) {
	if ctx.Value("userId") == nil {
		return nil, twirp.NewError(twirp.Unauthenticated, "login missing")
	}

	id, err := genTempID(ctx.Value("userId").(string), IDTypeEntityPreset)
	if err != nil {
		return nil, err
	}

	return &dd.CreateEntityPresetResponse{
		Id: id.ID,
	}, nil
}

// EditEntityPreset will modify or create an entity preset
func (d *DD) EditEntityPreset(ctx context.Context, gep *dd.EditEntityPresetRequest) (*dd.EntityPreset, error) {
	if ctx.Value("userId") == nil {
		return nil, twirp.NewError(twirp.Unauthenticated, "login missing")
	}

	res, err := dbase.Update("entity_presets").
		Set("id = ?", gep.Id).
		Set("name = ?", gep.Preset.Name).
		Set("description = ?", gep.Preset.Description).
		Set("image_id = ?", gep.Preset.ImageId).
		Set("player_creatable = ?", gep.Preset.PlayerCreatable).
		Set("attributes = ?", gep.Preset.Attributes).
		Set("inventory = ?", gep.Preset.Inventory).
		Set("health = ?", gep.Preset.Health).
		Exec()
	if err != nil {
		return nil, err
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		return nil, err
	}

	if rowsAffected == 0 {
		_, err = dbase.InsertInto("entity_presets").
			Columns(
				"id",
				"name",
				"description",
				"user_id",
				"image_id",
				"player_creatable",
				"campaign_id",
				"attributes",
				"inventory",
				"health",
			).
			Values(
				gep.Id,
				gep.Preset.Name,
				gep.Preset.Description,
				ctx.Value("userId").(string),
				gep.Preset.ImageId,
				gep.Preset.PlayerCreatable,
				gep.CampaignId,
				gep.Preset.Attributes,
				gep.Preset.Inventory,
				gep.Preset.Health,
			).
			Exec()
		if err != nil {
			return nil, err
		}

		err = clearTempID(gep.Id)
		if err != nil {
			return nil, err
		}
	}

	return gep.Preset, nil
}

