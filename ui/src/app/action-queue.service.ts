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
      const actionMap = {};

      this._queue = this._queue.filter((action) => {
        if (actionMap[action.type] === undefined) {
          actionMap[action.type] = true;
          return true;
        } else {
          return false;
        }
      });

      localStorage.setItem('action-queue', JSON.stringify(this._queue));
    }
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
  REDIRECT,
}
