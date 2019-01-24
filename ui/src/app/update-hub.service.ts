import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { ICampaign, CampaignService } from './campaign.service';
import { NotificationService } from './notification.service';
import { IEntity, EntityService } from './entity.service';
import * as Sentry from '@sentry/browser';

export enum ConnectionState {
  NOT_CONNECTED,
  CONNECTED,
  CLOSED,
  CONNECTING,
  AUTHENTICATING,
}

@Injectable({
  providedIn: 'root',
})
export class UpdateHubService {
  private _state: ConnectionState;

  private connection: HubConnection;

  private _isCampaignSubscribed = false;

  constructor(
    private login: LoginService,
    private campaignService: CampaignService,
    private notificationService: NotificationService,
    private entityService: EntityService
  ) {
    this._state = ConnectionState.NOT_CONNECTED;

    campaignService.events.subscribe((campaign) => {
      if (campaign === null && campaignService.previousCampaignId) {
        this.unsubscribeCampaign(campaignService.previousCampaignId);
      } else if (campaign !== null) {
        this.subscribeCampaign(campaignService.campaign.id);
      }
    });
  }

  private async setup() {
    this.connection.onclose((e) => {
      this._state = ConnectionState.CLOSED;
      this.start();
      Sentry.captureEvent(e);
    });

    this.connection.on('AuthenticateComplete', () => this.authComplete());

    this.connection.on('CampaignUpdate', (campaign: ICampaign) =>
      this.campaignUpdate(campaign)
    );

    this.connection.on('Notify', () => {
      this.notificationService.loadNotifications();
    });

    this.connection.on('EntityUpdate', (entity) => {
      this.entityUpdate(entity);
    });

    this.connection.on('EntityCreate', (entity) => {
      this.entityCreate(entity);
    });

    await this.authenticate();
  }

  private async authenticate() {
    this._state = ConnectionState.AUTHENTICATING;
    try {
      await this.connection.invoke('Authenticate');
    } catch (err) {
      throw err;
    }
  }

  public async start() {
    if (
      [ConnectionState.CLOSED, ConnectionState.NOT_CONNECTED].indexOf(
        this.state
      ) === -1
    ) {
      return;
    }

    const isLoggedIn = await this.login.isLoggedIn();

    if (!isLoggedIn) {
      setTimeout(() => {
        this.start();
      }, 1000);
      return;
    }

    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.hubURL}`, {
        accessTokenFactory: this.login.loadToken,
      })
      .build();

    try {
      this._state = ConnectionState.CONNECTING;
      await this.connection.start();
      this._state = ConnectionState.CONNECTED;
      await this.setup();
    } catch (err) {
      throw err;
      this._state = ConnectionState.CLOSED;
      setTimeout(() => {
        this.start();
      }, 5000);
    }
  }

  private authComplete() {
    this._state = ConnectionState.CONNECTED;

    if (this.campaignService.campaign) {
      this.subscribeCampaign(this.campaignService.campaign.id);
    }
  }

  private campaignUpdate(campaign: ICampaign) {
    if (
      this.campaignService.campaign &&
      this.campaignService.campaign.id === campaign.id
    ) {
      // TODO, do this automatically somehow
      const c = this.campaignService.campaign;

      c.name = campaign.name;
      c.description = campaign.description;
      c.imageId = campaign.imageId;
      c.experienceTable = campaign.experienceTable;
      c.itemTypes = campaign.itemTypes;
      c.itemRarities = campaign.itemRarities;
      c.currencyTypes = campaign.currencyTypes;
    }
  }

  private entityUpdate(entity: IEntity) {
    if (!this.campaignService.campaign) {
      console.warn('Received entity update but no campaign was present');
      return;
    }

    // populate properties from the campaign object
    entity.preset = this.campaignService.campaign.entityPresets.find(
      (ep) => ep.id === entity.entityPresetId
    );

    entity.user = this.campaignService.campaign.members.find(
      (m) => m.userId === entity.userId
    ).user;

    this.campaignService.campaign.entities.forEach((ent, idx) => {
      if (ent.id === entity.id) {
        this.campaignService.campaign.entities[idx] = {
          ...ent,
          ...entity,
        };
      }
    });

    if (
      this.entityService.currentViewEntity !== null &&
      this.entityService.currentViewEntity.id === entity.id
    ) {
      this.entityService.currentViewEntity = {
        ...this.entityService.currentViewEntity,
        ...entity,
      };
    }
  }

  private entityCreate(entity: IEntity) {
    if (!this.campaignService.campaign) {
      console.warn('Received entity create but no campaign was present');
      return;
    }

    // populate properties from the campaign object
    entity.preset = this.campaignService.campaign.entityPresets.find(
      (ep) => ep.id === entity.entityPresetId
    );

    entity.user = this.campaignService.campaign.members.find(
      (m) => m.userId === entity.userId
    ).user;

    this.campaignService.campaign.entities.push(entity);
  }

  public async subscribeCampaign(campaignId: string) {
    if (this.state !== ConnectionState.CONNECTED) {
      console.warn('Not in connected state');
      return;
    }

    try {
      const res = await this.connection.invoke('SubscribeCampaign', campaignId);
      this._isCampaignSubscribed = true;
    } catch (err) {
      throw err;
    }
  }

  public async unsubscribeCampaign(campaignId: string) {
    if (this.state !== ConnectionState.CONNECTED) {
      console.warn('Not in connected state');
      return;
    }

    try {
      const res = await this.connection.invoke(
        'UnsubscribeCampaign',
        campaignId
      );
      this._isCampaignSubscribed = false;
    } catch (err) {
      throw err;
    }
  }

  public get state() {
    return this._state;
  }
}
