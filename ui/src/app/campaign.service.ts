import { Injectable } from '@angular/core';
import { Campaign } from './campaign';
import { ItemService } from './item.service';
import { EntityService } from './entity.service';
import { Chance } from 'chance';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  public campaign: Campaign = null;
  public loadingCampaign = false;

  constructor(
    private itemService: ItemService,
    private entityService: EntityService
  ) {}

  public async setSelection(campaignId: string) {
    this.campaign = null;
    this.loadingCampaign = true;
    try {
      const campaign = await this.getCampaign(campaignId);
      this.campaign = campaign;
    } catch (err) {
      console.log('LOAD ERR', err);
    }
    this.loadingCampaign = false;
  }

  /**
   * Returns a list of campaigns the user can access
   */
  public async getCampaigns(): Promise<Campaign[]> {
    return Promise.all(
      ['1', '23', '54'].map((id) => {
        return this.getCampaign(id);
      })
    );
  }

  public async getCampaign(id: string): Promise<Campaign> {
    const c = new Chance();

    const campaign: Campaign = {
      id,
      name: c.word(),
      description: c.paragraph(),
      imageId: 'uncertainty',
      user: {
        id: '1',
        name: c.word(),
        imageURL: `https://api.adorable.io/avatars/285/${c.word()}`,
      },
      items: [],
      sessions: [],
      entityPresets: [],
      users: [],
    };

    campaign.items = await Promise.all(
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((itemId) => {
        return this.itemService.getItem(itemId);
      })
    );

    campaign.entityPresets = await Promise.all(
      ['1', '2', '3'].map((entId) => {
        return this.entityService.getEntityPreset(campaign.id, entId);
      })
    );

    for (let i = 0; i < 7; i++) {
      campaign.users.push({
        user: {
          id: i.toString(),
          name: c.word(),
          imageURL: `https://api.adorable.io/avatars/285/${c.word()}`,
        },
        isAdmin: false,
      });
    }

    await simulateDelay(250);
    return campaign;
  }
}

// Used in mock apis, will be removed
const simulateDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
