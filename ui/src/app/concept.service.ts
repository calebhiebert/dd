import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICampaign } from './campaign.service';
import { IEntity } from './entity.service';
import { ActionType, ActionSource } from './history';
import { IDynamicFieldConfig } from './custom-controls/dynform/form-types';
import { IArticleConcept } from './article.service';

@Injectable({
  providedIn: 'root',
})
export class ConceptService {
  constructor(private http: HttpClient) {}

  public getConceptType(id: string): Promise<IConceptType> {
    return this.http.get<IConceptType>(`${environment.apiURL}/concepttypes/${id}`).toPromise();
  }

  public createConceptType(conceptType: IConceptType): Promise<IConceptType> {
    return this.http.post<IConceptType>(`${environment.apiURL}/concepttypes`, conceptType).toPromise();
  }

  public updateConceptType(conceptType: IConceptType): Promise<void> {
    return this.http.put<void>(`${environment.apiURL}/concepttypes/${conceptType.id}`, conceptType).toPromise();
  }

  public deleteConceptType(id: string): Promise<IConceptType> {
    return this.http.delete<IConceptType>(`${environment.apiURL}/concepttypes/${id}`).toPromise();
  }

  public getConcept(id: string): Promise<IConcept> {
    return this.http.get<IConcept>(`${environment.apiURL}/concepts/${id}`).toPromise();
  }

  public getConcepts(
    typeId: string,
    limit?: number,
    offset?: number,
    search?: string,
    except?: string[],
    only?: string[]
  ): Promise<IConceptsQueryResult> {
    if (limit === undefined || limit === null || limit <= 0) {
      limit = 10;
    } else if (limit > 50) {
      limit = 50;
    }

    if (offset === undefined || offset === null || offset < 0) {
      offset = 0;
    }

    let searchQuery = '';

    if (search !== null && search !== undefined && search.trim().length > 0) {
      searchQuery = `&search=${encodeURIComponent(search)}`;
    }

    let onlyQuery = '';

    if (only) {
      only.forEach((id) => {
        onlyQuery += `&only=${id}`;
      });
    }

    let exceptQuery = '';

    if (except) {
      except.forEach((id) => {
        exceptQuery += `&except=${id}`;
      });
    }

    return this.http
      .get<IConceptsQueryResult>(
        `${environment.apiURL}/concepts?type=${typeId}&limit=${limit}&offset=${offset}${searchQuery}${onlyQuery}${exceptQuery}`
      )
      .toPromise();
  }

  public getConceptHistory(id: string): Promise<IConceptHistory[]> {
    return this.http.get<IConceptHistory[]>(`${environment.apiURL}/concepts/${id}/history`).toPromise();
  }

  public restoreConcept(id: string, historyId: string): Promise<IConcept> {
    return this.http.post<IConcept>(`${environment.apiURL}/concepts/${id}/restore/${historyId}`, null).toPromise();
  }

  public createConcept(concept: IConcept): Promise<IConcept> {
    return this.http
      .post<IConcept>(`${environment.apiURL}/concepts`, {
        ...concept,
        conceptType: undefined,
      })
      .toPromise();
  }

  public updateConcept(concept: IConcept): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/concepts/${concept.id}`, {
        ...concept,
        conceptType: undefined,
      })
      .toPromise();
  }

  public deleteConcept(id: string): Promise<IConcept> {
    return this.http.delete<IConcept>(`${environment.apiURL}/concepts/${id}`).toPromise();
  }

  public async getConceptEntities(entityId: string, conceptTypeId: string): Promise<IConceptEntity[]> {
    return this.http
      .get<IConceptEntity[]>(`${environment.apiURL}/conceptentities?entityId=${entityId}&conceptTypeId=${conceptTypeId}`)
      .toPromise();
  }

  public async updateConceptEntity(conceptEntity: IConceptEntity): Promise<IConceptEntity> {
    return this.http.put<IConceptEntity>(`${environment.apiURL}/conceptentities`, conceptEntity).toPromise();
  }

  public async updateConceptEntities(conceptEntities: IConceptEntity[], entityId: string) {
    return this.http
      .put<IConceptEntity>(`${environment.apiURL}/conceptentities/multi`, {
        conceptEntities,
        entityId,
      })
      .toPromise();
  }

  public async deleteConceptEntity(entId: string, conceptId: string): Promise<void> {
    return this.http.delete<void>(`${environment.apiURL}/conceptentities/${entId}/concept/${conceptId}`).toPromise();
  }

  public async getArticlesForConcept(conceptId: string): Promise<IArticleConcept[]> {
    return this.http.get<IArticleConcept[]>(`${environment.apiURL}/articleconcepts/articles/${conceptId}`).toPromise();
  }
}

export interface IConceptType {
  id?: string;
  name: string;
  pluralForm: string;
  description?: string;
  userId: string;
  icon?: string;
  fields: IConceptField[];
  entityConfig: IConceptEntityConfig;
  campaignId: string;
  campaign?: ICampaign;
  playerEditable: boolean;
  isShownInNavigationMenu: boolean;
  isLinkableToArticles: boolean;
  isUsableInOverviewScreen: boolean;
}

export interface IConcept {
  id?: string;
  name: string;
  content?: any;
  userId: string;
  fields: IField[];
  tags: string[];
  isContainer: boolean;
  imageId?: string;
  conceptTypeId: string;
  conceptType?: IConceptType;
}

export interface IConceptHistory {
  id: string;
  userId: string;
  dateTime: string;
  actionType: ActionType;
  actionSource: ActionSource;
  conceptId: string;
  name: string;
  content?: any;
  imageId?: string;
  fields: IField[];
  tags: string[];
  conceptTypeId: string;
}

export interface IConceptHistoryDiff extends IConceptHistory {
  diff: any;
  changes: string[];
}

export interface IConceptField extends IDynamicFieldConfig {}
export interface IConceptEntityFieldConfig extends IDynamicFieldConfig {}

export interface IField {
  name: string;
  value: any;
}

export interface IConceptsQueryResult {
  total: number;
  concepts: IConcept[];
}

export interface IConceptEntityConfig {
  enabled: boolean;
  enableQuantity: boolean;
  fields: IConceptEntityFieldConfig[];
}

export interface IConceptEntity {
  conceptId: string;
  concept?: IConcept;
  entityId: string;
  entity?: IEntity;
  fields: IField[];
  quantity?: number;
  parentEntityId?: string;
  parentConceptId?: string;
  content?: any;
  sortValue: number;
}
