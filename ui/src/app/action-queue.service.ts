import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActionQueueService {
  private _queue: IAction[];

  constructor() {}

  public load() {
    const qJson = localStorage.getItem('action-queue');

    if (qJson) {
      this._queue = JSON.parse(qJson);
    } else {
      this._queue = [];
    }
  }

  public save() {
    if (this._queue) {
      localStorage.setItem('action-queue', JSON.stringify(this._queue));
    }
  }

  public clear() {
    localStorage.removeItem('action-queue');
    this._queue = undefined;
  }

  public get queue() {
    this.load();
    return this._queue;
  }
}

export interface IAction {
  type: ActionType;
  data: { [key: string]: any };
}

export enum ActionType {
  ACCOUNT_SETUP,
  INVITE,
}
