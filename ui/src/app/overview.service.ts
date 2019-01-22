import { Injectable } from '@angular/core';
import { IEntity } from './entity.service';
import { CampaignService } from './campaign.service';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  private _sortMode: SortMode;
  private _sortDirection: SortDirection;

  constructor(private campaignService: CampaignService) {}

  private reset() {
    this._sortDirection = SortDirection.DESC;
    this._sortMode = SortMode.NAME;
  }

  public get entities() {
    return this.campaignService.campaign.entities.filter(e => !e.spawnable);
  }

  public get sortedEntities(): IEntity[] {
    return this.entities;
  }
}

export enum SortMode {
  NAME,
  HP_PERCENT,
  HP_MAX,
  HP_CURRENT
}

export enum SortDirection {
  ASC,
  DESC
}
