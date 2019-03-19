import { Injectable } from '@angular/core';
import { Chance } from 'chance';

@Injectable({
  providedIn: 'root',
})
export class DraftService {
  private _drafts: { [key: string]: IDraft<any> };

  constructor() {}

  private loadDraftObject() {
    this._drafts = JSON.parse(localStorage.getItem('drafts')) || {};
  }

  private saveDraftObject() {
    localStorage.setItem('drafts', JSON.stringify(this._drafts || {}));
  }

  public async getDrafts<T>(type: DraftType): Promise<IDraft<T>[]> {
    this.loadDraftObject();
    return Object.values(this._drafts).filter((d) => d.type === type);
  }

  public async createDraft<T>(draft: IDraft<T>): Promise<IDraft<T>> {
    this.loadDraftObject();

    const newDraft = { ...draft, id: new Chance().guid() };
    this._drafts[newDraft.id] = newDraft;

    this.saveDraftObject();

    return newDraft;
  }

  public async updateDraft<T>(draft: IDraft<T>): Promise<void> {
    this.loadDraftObject();

    if (!this._drafts[draft.id]) {
      throw new Error('not found');
    } else {
      this._drafts[draft.id] = draft;
    }

    this.saveDraftObject();
  }

  public async deleteDraft<T>(id: string): Promise<IDraft<T>> {
    this.loadDraftObject();
    const draft = this._drafts[id];
    delete this._drafts[id];
    this.saveDraftObject();
    return draft;
  }
}

export interface IDraft<T> {
  id: string;
  type: DraftType;
  data: T;
  dateTime: string;
}

export type DraftType = 'article' | 'quest' | 'entity' | string;
