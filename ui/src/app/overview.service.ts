import { Injectable } from '@angular/core';
import { IEntity } from './entity.service';
import { CampaignService } from './campaign.service';
import { EntitySortOrder, IOverviewState, OverviewStateService } from './overview-state.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { UpdateHubService } from './update-hub.service';
import { IConcept, IConceptType, ConceptService } from './concept.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  private _viewMode: 'full' | 'spectate' = 'full';
  private _reorderable = false;
  private _overviewState: IOverviewState;
  private _loading = false;
  private _concepts: { [key: string]: IConcept };

  constructor(
    private campaignService: CampaignService,
    private stateService: OverviewStateService,
    private updateService: UpdateHubService,
    private conceptService: ConceptService
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

  private cleanseEntityConceptTypes(conceptTypeId: string) {
    if (!this._overviewState) {
      return;
    }

    Object.entries(this._overviewState.entityConcepts).forEach(([entityId, conceptTypes]) => {
      if (conceptTypes[conceptTypeId]) {
        delete conceptTypes[conceptTypeId];
      }
    });

    this.updateState();
  }

  private async getConceptsForEntities() {
    if (!this._overviewState) {
      return;
    }

    // Map of ids to load, the key is a concept type, the elements are concept ids
    const idsToLoad: { [key: string]: string[] } = {};

    for (const [entId, conceptTypes] of Object.entries(this._overviewState.entityConcepts)) {
      for (const [conceptTypeId, conceptIds] of Object.entries(conceptTypes)) {
        if (!conceptIds) {
          continue;
        }

        if (!idsToLoad[conceptTypeId]) {
          idsToLoad[conceptTypeId] = [];
        }

        idsToLoad[conceptTypeId].push(...conceptIds);
      }
    }

    const loadPromises = Object.entries(idsToLoad).map(async ([conceptTypeId, conceptIds]) => {
      try {
        const loadResult = await this.conceptService.getConcepts(conceptTypeId, 50, 0, null, null, conceptIds);
        return loadResult;
      } catch (err) {
        if (err instanceof HttpErrorResponse && err.status === 404) {
          this.cleanseEntityConceptTypes(conceptTypeId);
        }

        return {
          concepts: [],
          total: 0,
        };
      }
    });

    const results = await Promise.all(loadPromises);

    const concepts: { [key: string]: IConcept } = {};

    results.forEach((res) => {
      res.concepts.forEach((c) => {
        concepts[c.id] = c;
      });
    });

    this._concepts = concepts;
  }

  public async loadOverviewState() {
    if (!this.campaignService.campaign.overviewStateId && this.campaignService.canEdit) {
      this._loading = true;

      try {
        this._overviewState = await this.stateService.updateOverviewState(
          {
            entitySortOrder: {},
            entityLabels: {},
            entityConcepts: {},
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
      this.getConceptsForEntities();
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

  public async setLabel(entity: IEntity, label: string) {
    if (this._overviewState) {
      this._overviewState.entityLabels[entity.id] = label;
      await this.updateState();
    }
  }

  public async addConceptEntity(entity: IEntity, concept: IConcept, conceptType: IConceptType) {
    if (!this._overviewState) {
      return;
    }

    if (!this._overviewState.entityConcepts[entity.id]) {
      this._overviewState.entityConcepts[entity.id] = {};
    }

    if (!this._overviewState.entityConcepts[entity.id][conceptType.id]) {
      this._overviewState.entityConcepts[entity.id][conceptType.id] = [];
    }

    if (this._overviewState.entityConcepts[entity.id][conceptType.id].indexOf(concept.id) === -1) {
      this._overviewState.entityConcepts[entity.id][conceptType.id].push(concept.id);
    }

    this.getConceptsForEntities();
    await this.updateState();
  }

  public async clearConceptEntities(entity: IEntity, conceptType: IConceptType) {
    if (!this._overviewState) {
      return;
    }

    if (this._overviewState.entityConcepts[entity.id] && this._overviewState.entityConcepts[entity.id][conceptType.id]) {
      delete this._overviewState.entityConcepts[entity.id][conceptType.id];
      await this.updateState();
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

  public get concepts() {
    return this._concepts || {};
  }
}
