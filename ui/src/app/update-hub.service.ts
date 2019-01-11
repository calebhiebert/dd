import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { ICampaign, CampaignService } from './campaign.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateHubService {
  private _state: ConnectionState;

  private connection: HubConnection;

  constructor(
    private login: LoginService,
    private campaignService: CampaignService
  ) {
    this._state = ConnectionState.NOT_CONNECTED;
  }

  private async setup() {
    this.connection.onclose((e) => {
      this._state = ConnectionState.CLOSED;
      console.log('Connection Closed', e);
      this.start();
    });

    this.connection.on('AuthenticateComplete', () => this.authComplete());
    this.connection.on('CampaignUpdate', (campaign: ICampaign) =>
      this.campaignUpdate(campaign)
    );

    await this.authenticate();
  }

  private async authenticate() {
    this._state = ConnectionState.AUTHENTICATING;
    try {
      await this.connection.invoke('Authenticate');
    } catch (err) {
      console.log('Auth ERR', err);
    }
  }

  public async start() {
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
      console.log('Connection Err', err);
      setTimeout(() => {
        this.start();
      }, 5000);
    }
  }

  public get state() {
    return this._state;
  }

  public authComplete() {
    console.log('Authenticated');
    this._state = ConnectionState.CONNECTED;
  }

  public campaignUpdate(campaign: ICampaign) {
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
}

export enum ConnectionState {
  NOT_CONNECTED,
  CONNECTED,
  CLOSED,
  CONNECTING,
  AUTHENTICATING,
}
