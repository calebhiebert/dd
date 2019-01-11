import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateHubService {
  private _state: ConnectionState;

  private connection: HubConnection;

  constructor(private login: LoginService) {
    this._state = ConnectionState.NOT_CONNECTED;
  }

  private async setup() {
    this.connection.onclose((e) => {
      this._state = ConnectionState.CLOSED;
      console.log('Connection Closed', e);
    });

    this.connection.on('AuthenticateComplete', () => {
      this._state = ConnectionState.CONNECTED;
    });

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
}

export enum ConnectionState {
  NOT_CONNECTED,
  CONNECTED,
  CLOSED,
  CONNECTING,
  AUTHENTICATING,
}
