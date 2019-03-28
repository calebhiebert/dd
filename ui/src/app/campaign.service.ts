import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEntityPreset, IEntity } from './entity.service';
import { environment } from 'src/environments/environment';
import { IUser } from './user.service';
import { LoginService } from './login.service';
import { IConceptType } from './concept.service';
import { UpdateHubService, ConnectionState } from './update-hub.service';
import { IOverviewState } from './overview-state.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private _campaign: ICampaign = null;

  public loadingCampaign = false;
  public previousCampaignId: string;

  constructor(private http: HttpClient, private login: LoginService, private updateHub: UpdateHubService) {
    this.updateHub.stateUpdate.subscribe((state) => {
      if (state === ConnectionState.CONNECTED && this._campaign) {
        this.updateHub.subscribeCampaign(this._campaign.id);
      }
    });

    this.updateHub.campaignUpdated.subscribe((campaign: ICampaign) => {
      if (this._campaign && this._campaign.id === campaign.id) {
        // TODO, do this automatically somehow
        this._campaign.name = campaign.name;
        this._campaign.content = campaign.content;
        this._campaign.imageId = campaign.imageId;
        this._campaign.experienceTable = campaign.experienceTable;
        this._campaign.itemTypes = campaign.itemTypes;
        this._campaign.currencyMap = campaign.currencyMap;
      }
    });

    this.updateHub.campaignRefresh.subscribe(() => {
      this.refreshCurrentCampaign();
    });

    this.updateHub.entityUpdated.subscribe((entity: IEntity) => {
      if (!this._campaign) {
        return;
      }

      // populate properties from the campaign object
      entity.preset = this._campaign.entityPresets.find((ep) => ep.id === entity.entityPresetId);
      entity.user = this._campaign.members.find((m) => m.userId === entity.userId).user;

      this._campaign.entities.forEach((ent, idx) => {
        if (ent.id === entity.id) {
          this._campaign.entities[idx] = {
            ...ent,
            ...entity,
          };
        }
      });
    });

    this.updateHub.entityDeleted.subscribe((id: string) => {
      if (!this._campaign) {
        return;
      }

      this._campaign.entities = this._campaign.entities.filter((e) => e.id !== id);
    });

    this.updateHub.entityCreated.subscribe((entity: IEntity) => {
      if (!this._campaign) {
        return;
      }

      // populate properties from the campaign object
      entity.preset = this._campaign.entityPresets.find((ep) => ep.id === entity.entityPresetId);
      entity.user = this._campaign.members.find((m) => m.userId === entity.userId).user;
      this._campaign.entities.push(entity);
    });
  }

  public async setSelection(campaignId?: string) {
    if (campaignId === null || campaignId === undefined) {
      if (this.campaign !== null && this.campaign !== undefined) {
        this.previousCampaignId = this.campaign.id;
        this.updateHub.unsubscribeCampaign(this.previousCampaignId);
      }

      this.campaign = null;
      return;
    }

    this.updateHub.subscribeCampaign(campaignId);
    this.campaign = null;
    this.loadingCampaign = true;

    try {
      const campaign = await this.getCampaign(campaignId);
      this.campaign = campaign;
      document.title = this.campaign.name;
    } catch (err) {
      throw err;
    }

    this.loadingCampaign = false;
  }

  public async refreshCurrentCampaign() {
    if (!this.campaign) {
      return;
    }

    try {
      const campaign = await this.getCampaign(this.campaign.id);
      Object.assign(this.campaign, campaign);
      document.title = this.campaign.name;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Returns a list of campaigns the user can access
   */
  public async getCampaigns(): Promise<ICampaign[]> {
    return this.http.get<ICampaign[]>(`${environment.apiURL}/campaigns`).toPromise();
  }

  public async getCampaign(id: string): Promise<ICampaign> {
    return this.http.get<ICampaign>(`${environment.apiURL}/campaigns/${id}`).toPromise();
  }

  public async createCampaign(campaign: ICampaign): Promise<ICampaign> {
    return this.http
      .post<ICampaign>(`${environment.apiURL}/campaigns`, {
        ...campaign,
        id: undefined,
      })
      .toPromise();
  }

  public async updateCampaign(campaign: ICampaign): Promise<ICampaign> {
    return this.http.put<ICampaign>(`${environment.apiURL}/campaigns/${campaign.id}`, campaign).toPromise();
  }

  public async deleteCampaign(campaign: ICampaign): Promise<ICampaign> {
    return this.http.delete<ICampaign>(`${environment.apiURL}/campaigns/${campaign.id}`).toPromise();
  }

  public async getInvites(): Promise<ICampaignInvite[]> {
    return this.http.get<ICampaignInvite[]>(`${environment.apiURL}/campaigninvites?campaignId=${this.campaign.id}`).toPromise();
  }

  public async getInvite(id: string): Promise<ICampaignInvite> {
    return this.http.get<ICampaignInvite>(`${environment.apiURL}/campaigninvites/${id}`).toPromise();
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
    return this.http.put<void>(`${environment.apiURL}/campaigninvites/${invite.id}`, invite).toPromise();
  }

  public async deleteInvite(token: string): Promise<void> {
    return this.http.delete<void>(`${environment.apiURL}/campaigninvites/${token}`).toPromise();
  }

  public async acceptInvite(token: string): Promise<void> {
    return this.http.post<void>(`${environment.apiURL}/campaigninvites/${token}/accept`, {}).toPromise();
  }

  public async denyInvite(token: string): Promise<void> {
    return this.http.post<void>(`${environment.apiURL}/campaigninvites/${token}/decline`, {}).toPromise();
  }

  public async removeMember(campaignUser: ICampaignUser) {
    return this.http.delete<void>(`${environment.apiURL}/campaigns/${campaignUser.campaignId}/member/${campaignUser.userId}`).toPromise();
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

  public getXPToNextLevel(currentXp: number): number {
    const xpTable = this.campaign.experienceTable || [];

    for (let i = 0; i < xpTable.length; i++) {
      const xpRequired = xpTable[i];

      if (currentXp < xpRequired) {
        return xpRequired - currentXp;
      }
    }

    return -1;
  }

  /**
   * Returns the entity preset from the current campaign object (if it exists)
   */
  public getEntityPreset(presetId: string): IEntityPreset {
    if (!this.campaign) {
      return null;
    }

    return this.campaign.entityPresets.find((ep) => ep.id === presetId) || null;
  }

  /**
   * Returns the user from the current campaign object (if it exists)
   */
  public getUser(userId: string): ICampaignUser | null {
    if (!this.campaign) {
      return null;
    }

    return this.campaign.members.find((m) => m.userId === userId) || null;
  }

  public get canEdit() {
    if (!this.campaign) {
      return false;
    }

    return this.login.id === this.campaign.userId;
  }

  public get editableEntities(): IEntity[] {
    if (!this.campaign) {
      return [];
    }

    if (this.canEdit) {
      return this.campaign.entities;
    }

    return this.campaign.entities.filter((e) => e.userId === this.login.id);
  }

  public get campaign() {
    return this._campaign;
  }

  public set campaign(value: ICampaign) {
    this._campaign = value;
  }
}

export interface ICampaign {
  id: string;
  name: string;
  content?: any;
  imageId: string;
  userId: string;
  user?: IUser;
  experienceTable: number[];
  entities?: IEntity[];
  entityPresets?: IEntityPreset[];
  itemTypes?: IItemType[];
  currencyMap?: ICurrencyLevel[];
  members?: ICampaignUser[];
  conceptTypes?: IConceptType[];
  trackCoins?: boolean;
  overviewStateId?: string;
  overviewState?: IOverviewState;
  createdAt?: Date;
}

export interface ICampaignInvite {
  id: string;
  name: string;
  campaignId: string;
  campaign?: ICampaign;
  createdAt: Date;
  status: CampaignInviteStatus;
  acceptedUserId?: string;
  user?: IUser;
}

export interface ICampaignUser {
  campaignId: string;
  campaign?: ICampaign;
  userId: string;
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

export interface ICurrencyLevel {
  name: string;
  value: number;
  useInConversions: boolean;
}
