import { Injectable } from '@angular/core';
import { AttributeType } from './attributes';
import { HttpClient } from '@angular/common/http';
import { IUser } from './user.service';
import { ICampaign } from './campaign.service';
import { environment } from 'src/environments/environment';
import { IItem } from './item.service';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(private http: HttpClient) {}

  public async updateEntityPreset(entityPreset: IEntityPreset): Promise<void> {
    return this.http
      .put<void>(
        `${environment.apiURL}/entitypresets/${entityPreset.id}`,
        entityPreset
      )
      .toPromise();
  }

  // Creates a blank entity preset and returns the ID
  public async createEntityPreset(
    preset: IEntityPreset
  ): Promise<IEntityPreset> {
    return this.http
      .post<IEntityPreset>(`${environment.apiURL}/entitypresets`, preset)
      .toPromise();
  }

  public async getEntityPreset(id: string): Promise<IEntityPreset> {
    return this.http
      .get<IEntityPreset>(`${environment.apiURL}/entitypresets/${id}`)
      .toPromise();
  }

  public async deleteEntityPreset(
    campaignId: string,
    entityPresetId: string
  ): Promise<void> {}

  public async getEntity(id: string): Promise<IEntity> {
    return this.http
      .get<IEntity>(`${environment.apiURL}/entities/${id}`)
      .toPromise();
  }

  public async createEntity(entity: IEntity): Promise<IEntity> {
    return this.http
      .post<IEntity>(`${environment.apiURL}/entities`, entity)
      .toPromise();
  }

  public async updateEntity(entity: IEntity): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/entities/${entity.id}`, entity)
      .toPromise();
  }

  public async deleteEntity(
    campaignId: string,
    entity: IEntity
  ): Promise<void> {}

  public async getInventory(entityId: string): Promise<IInventoryItem[]> {
    return this.http
      .get<IInventoryItem[]>(
        `${environment.apiURL}/inventoryitems?entityId=${entityId}`
      )
      .toPromise();
  }

  public async createInventoryItem(
    inventoryItem: IInventoryItem
  ): Promise<IInventoryItem> {
    return this.http
      .post<IInventoryItem>(
        `${environment.apiURL}/inventoryitems`,
        inventoryItem
      )
      .toPromise();
  }

  public async updateInventoryItem(inventoryItem: IInventoryItem) {
    return this.http
      .put<void>(
        `${environment.apiURL}/inventoryitems/${inventoryItem.id}`,
        inventoryItem
      )
      .toPromise();
  }

  public async deleteInventoryItem(id: string): Promise<void> {
    return this.http
      .delete<void>(`${environment.apiURL}/inventoryitems/${id}`)
      .toPromise();
  }
}

export interface IEntityPreset {
  id: string;
  name: string;
  description: string;
  userId: string;
  user?: IUser;
  imageId: string;
  playerCreatable: boolean;
  attributes?: IEntityAttribute[];
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
  description: string;
  imageId?: string;
  userId: string;
  user?: IUser;
  campaignId: string;
  campaign?: ICampaign;
  attributes: IAttribute[];
  health: IHealth;
  xp: number;
  currency: number;
  entityPresetId: string;
  preset?: IEntityPreset;
  inventoryItems?: IInventoryItem[];
}

export interface IAttribute {
  name: string;
  type: AttributeType;
  data: string;
}

export interface IInventoryItem {
  id?: string;
  itemId: string;
  item?: IItem;
  entityId: string;
  entity?: IEntity;
  quantity: number;
}

export interface IHealthPreset {
  type: HealthType;
  max: number;
  bars?: number[];
}

export interface IHealth {
  max: number;
  current: number;
  bars?: number[];
}

export enum EntityAttributeClass {
  MAJOR,
  NORMAL,
  MINOR,
  UNIMPORTANT,
}

export enum HealthType {
  NORMAL,
  MULTI_BAR,
}
