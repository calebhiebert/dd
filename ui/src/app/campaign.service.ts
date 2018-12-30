import { Injectable } from '@angular/core';
import { Campaign } from './campaign';
import { User } from './user';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  public campaign: Campaign = null;
  public loadingCampaign = false;

  constructor(private itemService: ItemService) {}

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
    const campaigns: Campaign[] = [];

    await simulateDelay(250);

    return Promise.all(
      ['1', '23', '54'].map((id) => {
        return this.getCampaign(id);
      })
    );
  }

  public async getCampaign(id: string): Promise<Campaign> {
    const campaign: Campaign = {
      id,
      name: 'Dungeons of Time',
      description:
        'A campaign set in the second age of the Wheel of Time. Happens during the war of power.',
      user: {
        id: '1',
        name: 'Panchem',
      },
      items: [],
      sessions: [],
      entities: [],
    };

    campaign.items = await Promise.all(
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((itemId) => {
        return this.itemService.getItem(itemId);
      })
    );

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
