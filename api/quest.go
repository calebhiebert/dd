package main
import (
	"context"
	"dd-api/dd"

	gonanoid "github.com/matoous/go-nanoid"
)

// GetQuests returns a list of quests
func (d *DD) GetQuests(ctx context.Context, gq *dd.GetQuestsRequest) (*dd.GetQuestsResponse, error) {
	quests := []*dd.Quest{}

	for i := 0; i < 5; i++ {
		quest, err := d.GetQuest(ctx, &dd.GetByIdRequest{})
		if err != nil {
			return nil, err
		}

		quests = append(quests, quest)
	}

	return &dd.GetQuestsResponse{
		Quests: quests,
		Total:  5,
	}, nil
}

// GetQuest will return the quest waiting at a given id
func (d *DD) GetQuest(ctx context.Context, qr *dd.GetByIdRequest) (*dd.Quest, error) {

	id, err := gonanoid.Nanoid()
	if err != nil {
		return nil, err
	}

	return &dd.Quest{
		Id:          id,
		Name:        "Quest Name",
		Description: "A nice long quest description",
	}, nil
}

// CreateQuest will generate an id for a quest, but not actually create the object
func (d *DD) CreateQuest(ctx context.Context, qr *dd.CreateQuestRequest) (*dd.CreateQuestResponse, error) {
	id, err := gonanoid.Nanoid()
	if err != nil {
		return nil, err
	}

	return &dd.CreateQuestResponse{
		Id: id,
	}, nil
}

// EditQuest will update a quest in the database
func (d *DD) EditQuest(ctx context.Context, eq *dd.EditQuestRequest) (*dd.Quest, error) {
	return eq.Quest, nil
}

