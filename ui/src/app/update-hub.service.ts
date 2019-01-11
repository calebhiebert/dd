import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdateHubService {
  private _state: ConnectionState;

  private connection: HubConnection;

  constructor() {
    this._state = ConnectionState.NOT_CONNECTED;

    this.connection = new HubConnectionBuilder()
      .withUrl(environment.hubURL)
      .build();
  }

  private setup() {
    this.connection.onclose((e) => {
      this._state = ConnectionState.CLOSED;
      console.log('Connection Closed', e);
    });
  }

  public async start() {
    try {
      this._state = ConnectionState.CONNECTING;
      await this.connection.start();
      this._state = ConnectionState.CONNECTED;
      this.setup();
    } catch (err) {
      console.log('Connection Err', err);
      setTimeout(() => {
        this.start();
      }, 1000);
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
