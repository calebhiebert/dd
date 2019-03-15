import { Injectable } from '@angular/core';
import { AttributeType } from './attributes';
import { HttpClient } from '@angular/common/http';
import { IUser } from './user.service';
import { ICampaign } from './campaign.service';
import { environment } from 'src/environments/environment';
import { IDynamicFieldConfig } from './dynform/form-types';
import { IField } from './concept.service';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  private _currentViewEntity: IEntity = null;

  constructor(private http: HttpClient) {}

  public async updateEntityPreset(entityPreset: IEntityPreset): Promise<void> {
    return this.http.put<void>(`${environment.apiURL}/entitypresets/${entityPreset.id}`, entityPreset).toPromise();
  }

  // Creates a blank entity preset and returns the ID
  public async createEntityPreset(preset: IEntityPreset): Promise<IEntityPreset> {
    return this.http
      .post<IEntityPreset>(`${environment.apiURL}/entitypresets`, {
        ...preset,
        id: undefined,
      })
      .toPromise();
  }

  public async getEntityPreset(id: string): Promise<IEntityPreset> {
    return this.http.get<IEntityPreset>(`${environment.apiURL}/entitypresets/${id}`).toPromise();
  }

  public async deleteEntityPreset(campaignId: string, entityPresetId: string): Promise<void> {}

  public async getEntity(id: string): Promise<IEntity> {
    return this.http.get<IEntity>(`${environment.apiURL}/entities/${id}`).toPromise();
  }

  public async getEntities(campaignId: string, spawnable: boolean = false): Promise<IEntity[]> {
    return this.http.get<IEntity[]>(`${environment.apiURL}/entities?campaignId=${campaignId}&spawnable=${spawnable}`).toPromise();
  }

  public async createEntity(entity: IEntity): Promise<IEntity> {
    return this.http
      .post<IEntity>(`${environment.apiURL}/entities`, {
        ...entity,
        id: undefined,
      })
      .toPromise();
  }

  public async updateEntity(entity: IEntity): Promise<void> {
    return this.http.put<void>(`${environment.apiURL}/entities/${entity.id}`, entity).toPromise();
  }

  public async deleteEntity(id: string): Promise<void> {
    return this.http.delete<void>(`${environment.apiURL}/entities/${id}`).toPromise();
  }

  public async spawnSpawnable(spawnableId: string, count: number): Promise<void> {
    return this.http.post<void>(`${environment.apiURL}/entities/spawn/${spawnableId}?count=${count}`, null).toPromise();
  }

  public get currentViewEntity() {
    return this._currentViewEntity;
  }

  public set currentViewEntity(entity: IEntity) {
    this._currentViewEntity = entity;
  }
}

export interface IEntityPreset {
  id?: string;
  name: string;
  description: string;
  userId: string;
  user?: IUser;
  imageId: string;
  playerCreatable: boolean;
  isCurrencyEnabled: boolean;
  isXPEnabled: boolean;
  isHealthEnabled: boolean;
  conceptTypesEnabled: string[];
  attributes?: IEntityAttribute[];
  fields?: IEntityFieldConfig[];
  health: IHealthPreset;
  campaignId: string;
  campaign?: ICampaign;
}

export interface IEntityAttribute {
  name: string;
  description: string;
  imageId?: string;
  defaultValue?: string;
  type: AttributeType;
  options?: string[];
  class: EntityAttributeClass;
  required: boolean;
  max?: number;
  min?: number;
}

export interface IEntity {
  id?: string;
  name: string;
  content?: any;
  imageId?: string;
  imageColor1?: string;
  imageColor2?: string;
  userId: string;
  user?: IUser;
  campaignId: string;
  campaign?: ICampaign;
  attributes: IAttribute[];
  fields: IField[];
  spawnable: boolean;
  spawnedFromId?: string;
  health?: IHealth;
  xp?: number;
  currency?: { value?: number; values?: { [key: string]: number } };
  entityPresetId: string;
  preset?: IEntityPreset;
  mapId?: string;
  lat?: number;
  lng?: number;
}

export interface IAttribute {
  name: string;
  type: AttributeType;
  data: any;
}

export interface IHealthPreset {
  type: HealthType;
  amountHidden: boolean;
  colorType?: HealthColorType;
  staticColor?: string;
}

export interface IHealth {
  max: number;
  current: number;
  textDamageLevels?: { [key: number]: string };
}

export interface IViewField {
  field: IField;
  config: IEntityFieldConfig;
}

export interface ICurrency {
  values: { [key: string]: number };
  value: number;
}

export interface IEntityFieldConfig extends IDynamicFieldConfig {
  class: EntityAttributeClass;
}

export enum EntityAttributeClass {
  MAJOR,
  NORMAL,
  MINOR,
  UNIMPORTANT,
}

export enum HealthType {
  NORMAL,
  TEXT_BASED,
}

export enum HealthColorType {
  DYNAMIC,
  STATIC,
}
