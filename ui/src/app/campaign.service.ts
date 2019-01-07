import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Campaign } from './campaign';
import { ItemService } from './item.service';
import { EntityService, IEntityPreset } from './entity.service';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { IUser } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  public campaign: ICampaign = null;
  public loadingCampaign = false;

  constructor(
    private itemService: ItemService,
    private entityService: EntityService,
    private http: HttpClient
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
  public async getCampaigns(): Promise<ICampaign[]> {
    return this.http
      .get<ICampaign[]>(`${environment.apiURL}/campaigns`)
      .toPromise();
  }

  public async getCampaign(id: string): Promise<ICampaign> {
    return this.http
      .get<ICampaign>(`${environment.apiURL}/campaigns/${id}`)
      .toPromise();
  }

  public async createCampaign(campaign: ICampaign): Promise<ICampaign> {
    return this.http
      .post<ICampaign>(`${environment.apiURL}/campaigns`, campaign)
      .toPromise();
  }

  public async updateCampaign(campaign: ICampaign): Promise<ICampaign> {
    return this.http
      .put<ICampaign>(
        `${environment.apiURL}/campaigns/${campaign.id}`,
        campaign
      )
      .toPromise();
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

export interface ICampaign {
  id: string;
  name: string;
  description: string;
  imageId: string;
  userId: string;
  user?: IUser;
  experienceTable: number[];
  entities?: any[];
  items?: any[];
  entityPresets?: IEntityPreset[];
  createdAt?: Date;
}

// Used in mock apis, will be removed
const simulateDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
