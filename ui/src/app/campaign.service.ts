import { Injectable } from '@angular/core';
import { Campaign } from './campaign';
import { ItemService } from './item.service';
import { EntityService } from './entity.service';
import { Chance } from 'chance';
import { RpcService } from './rpc.service';
import { dd } from 'src/dd.pb';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  public campaign: dd.ICampaign = null;
  public loadingCampaign = false;

  constructor(
    private itemService: ItemService,
    private entityService: EntityService,
    private rpc: RpcService
  ) {}

  public async setSelection(campaignId: string) {
    this.campaign = null;
    this.loadingCampaign = true;
    try {
      const campaign = await this.rpc.dd.getCampaign({ id: campaignId });
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
      entities: [],
      experienceTable: [
        300,
        900,
        2700,
        6500,
        14000,
        23000,
        34000,
        48000,
        64000,
        85000,
      ],
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

    campaign.entities = await Promise.all(
      ['1', '2', '3', '2', '2', '2', '2', '2'].map((entId) => {
        return this.entityService.getEntity(campaign.id, entId);
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

  public async saveCampaign(
    campaign: dd.ICampaignCore
  ): Promise<dd.ICampaignCore> {
    await simulateDelay(250);

    return { ...campaign };
  }

  public calculateLevel(xp: number): number {
    if (!this.campaign) {
      throw new Error('No campaign present');
    }

    const xpTable = this.campaign.experienceTable;

    let level = 1;

    for (let i = 0; i < xpTable.length; i++) {
      const xpRequired = xpTable[i];

      if (xp >= xpRequired) {
        level++;
      } else {
        break;
      }
    }

    return level;
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
