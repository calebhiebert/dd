import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemService, IItem } from './item.service';
import { EntityService, IEntityPreset } from './entity.service';
import { environment } from 'src/environments/environment';
import { IUser } from './user.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  public campaign: ICampaign = null;
  public loadingCampaign = false;

  constructor(private http: HttpClient, private login: LoginService) {}

  public async setSelection(campaignId: string) {
    this.campaign = null;
    this.loadingCampaign = true;
    try {
      const campaign = await this.getCampaign(campaignId);
      this.campaign = campaign;

      document.title = this.campaign.name;
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

  public async getInvites(): Promise<ICampaignInvite[]> {
    return this.http
      .get<ICampaignInvite[]>(
        `${environment.apiURL}/campaigninvites?campaignId=${this.campaign.id}`
      )
      .toPromise();
  }

  public async getInvite(id: string): Promise<ICampaignInvite> {
    return this.http
      .get<ICampaignInvite>(`${environment.apiURL}/campaigninvites/${id}`)
      .toPromise();
  }

  public async createInvite(name: string): Promise<ICampaignInvite> {
    return this.http
      .post<ICampaignInvite>(`${environment.apiURL}/campaigninvites`, {
        campaignId: this.campaign.id,
        name,
      })
      .toPromise();
  }

  public async updateInvite(invite: ICampaignInvite): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/campaigninvites/${invite.id}`, invite)
      .toPromise();
  }

  public async deleteInvite(token: string): Promise<void> {
    return this.http
      .delete<void>(`${environment.apiURL}/campaigninvites/${token}`)
      .toPromise();
  }

  public async acceptInvite(token: string): Promise<void> {
    return this.http
      .post<void>(`${environment.apiURL}/campaigninvites/${token}/accept`, {})
      .toPromise();
  }

  public async denyInvite(token: string): Promise<void> {
    return this.http
      .post<void>(`${environment.apiURL}/campaigninvites/${token}/decline`, {})
      .toPromise();
  }

  public get canEdit() {
    if (!this.campaign) {
      return false;
    } else {
      return this.login.id === this.campaign.userId;
    }
  }

  public calculateLevel(xp: number): number {
    if (!this.campaign) {
      throw new Error('No campaign present');
    }

    const xpTable = this.campaign.experienceTable || [];

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
  items?: IItem[];
  entityPresets?: IEntityPreset[];
  itemTypes?: IItemType[];
  currencyTypes?: ICurrencyType[];
  createdAt?: Date;
}

export interface ICampaignInvite {
  id: string;
  name: string;
  campaignId: string;
  createdAt: Date;
  status: CampaignInviteStatus;
  acceptedUserId?: string;
  user?: IUser;
}

export enum CampaignInviteStatus {
  PENDING,
  REVOKED,
  ACCEPTED,
}

export interface IItemType {
  name: string;
  imageId: string;
  color: string;
}

export interface ICurrencyType {
  name: string;
  imageId: string;
  value: number;
}
