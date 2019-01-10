import { Injectable } from '@angular/core';
import { Entity, AttributeClass } from './entity';
import { AttributeType } from './attributes';
import { HttpClient } from '@angular/common/http';
import { IUser } from './user.service';
import { ICampaign } from './campaign.service';
import { environment } from 'src/environments/environment';

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
  ): Promise<void> {
    await simulateDelay(250);
  }

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

  public async deleteEntity(campaignId: string, entity: Entity): Promise<void> {
    await simulateDelay(250);
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
  class: AttributeClass;
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
  xp: number;
  entityPresetId: string;
  preset?: IEntityPreset;
}

export interface IAttribute {
  name: string;
  type: AttributeType;
  data: string;
}

// Used in mock apis, will be removed
const simulateDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
