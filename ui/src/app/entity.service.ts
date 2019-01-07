import { Injectable } from '@angular/core';
import { EntityPreset, HealthMode, Entity, AttributeClass } from './entity';
import { AttributeType } from './attributes';
import { Chance } from 'chance';
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

  public async getEntity(campaignId: string, entId: string): Promise<Entity> {
    await simulateDelay(250);

    const c = new Chance();

    const ent: Entity = {
      id: entId,
      name: c.word(),
      description: c.paragraph(),
      imageId: 'uncertainty',
      attributes: [],
      inventory: { items: [] },
      xp: c.integer({ min: 0, max: 80000 }),
      user: {
        id: entId,
        name: c.word(),
        imageURL: `https://api.adorable.io/avatars/285/${c.word()}`,
      },
      health: {
        mode: HealthMode.NORMAL,
        normal: {
          max: 36,
          current: 36,
          temp: 0,
        },
      },
    };

    for (const pattr of ent.preset.attributes) {
      ent.attributes.push({
        name: pattr.name,
        type: pattr.type,
        data:
          pattr.type === AttributeType.NUMBER
            ? c.integer({ min: 0, max: 50 }).toString()
            : c.word(),
      });
    }

    return ent;
  }

  public async createEntity(
    campaignId: string,
    entityPresetId: string
  ): Promise<string> {
    await simulateDelay(250);
    return '1';
  }

  public async saveEntity(campaignId: string, entity: Entity): Promise<Entity> {
    await simulateDelay(250);
    return entity;
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
  id: string;
  name: string;
  description: string;
  imageId?: string;
  defaultValue?: string;
  type: AttributeType;
  options?: string[];
  class: AttributeClass;
  required: boolean;
  entityPresetId: string;
  preset?: IEntityPreset;
  max?: number;
  min?: number;
}

// Used in mock apis, will be removed
const simulateDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
