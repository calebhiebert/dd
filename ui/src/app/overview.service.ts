import { Injectable } from '@angular/core';
import { IEntity } from './entity.service';
import { CampaignService } from './campaign.service';
import { EntitySortOrder, IOverviewState, OverviewStateService } from './overview-state.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { UpdateHubService } from './update-hub.service';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  private _viewMode: 'full' | 'spectate' = 'full';
  private _reorderable = false;
  private _overviewState: IOverviewState;
  private _loading = false;

  constructor(
    private campaignService: CampaignService,
    private stateService: OverviewStateService,
    private updateService: UpdateHubService
  ) {
    updateService.overviewStateUpdate.subscribe((os: IOverviewState) => {
      this._overviewState = os;
    });
  }

  private getSortOrder(entities: IEntity[]): EntitySortOrder {
    const sortOrder: EntitySortOrder = {};

    entities.forEach((ent, idx) => {
      sortOrder[ent.id] = idx;
    });

    return sortOrder;
  }

  private async updateState() {
    this._loading = true;

    try {
      this.stateService.updateOverviewState(this._overviewState, this.campaignService.campaign.id);
    } catch (err) {
      throw err;
    }

    this._loading = false;
  }

  public async loadOverviewState() {
    if (!this.campaignService.campaign.overviewStateId && this.campaignService.canEdit) {
      this._loading = true;

      try {
        this._overviewState = await this.stateService.updateOverviewState(
          {
            entitySortOrder: {},
          },
          this.campaignService.campaign.id
        );
      } catch (err) {
        throw err;
      }

      this._loading = false;
      return;
    }

    this._loading = true;

    try {
      this._overviewState = await this.stateService.getOverviewState(this.campaignService.campaign.overviewStateId);
    } catch (err) {
      throw err;
    }

    this._loading = false;
  }

  public setViewMode(viewMode: 'full' | 'spectate') {
    this._viewMode = viewMode;
  }

  public toggleReorderable() {
    this._reorderable = !this._reorderable;
  }

  public swapEntities(oldIdx: number, newIdx: number) {
    const entities = [...this.sortedEntities];

    moveItemInArray(entities, oldIdx, newIdx);

    if (this._overviewState) {
      this._overviewState.entitySortOrder = this.getSortOrder(entities);
      this.updateState();
    }
  }

  public get entities() {
    return this.campaignService.campaign.entities.filter((e) => !e.spawnable);
  }

  public get sortedEntities(): IEntity[] {
    if (this._overviewState) {
      return [...this.entities].sort((a, b) => {
        const aSortValue = this._overviewState.entitySortOrder[a.id] || 0;
        const bSortValue = this._overviewState.entitySortOrder[b.id] || 0;

        return aSortValue - bSortValue;
      });
    }

    return this.entities;
  }

  public get reorderable(): boolean {
    return this._reorderable;
  }

  public get state() {
    return this._overviewState;
  }

  public get viewMode() {
    return this._viewMode;
  }
}
