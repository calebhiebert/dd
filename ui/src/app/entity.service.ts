import { Injectable } from '@angular/core';
import { EntityPreset, HealthMode, Entity } from './entity';
import { AttributeType } from './attributes';
import { Chance } from 'chance';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor() {}

  public async saveEntityPreset(
    campaignId: string,
    entityPreset: EntityPreset
  ): Promise<EntityPreset> {
    await simulateDelay(250);

    entityPreset.id = '1';
    return entityPreset;
  }

  // Creates a blank entity preset and returns the ID
  public async createEntityPreset(): Promise<string> {
    await simulateDelay(250);
    return '1';
  }

  public async getEntityPreset(
    campaignId: string,
    entityPresetId: string
  ): Promise<EntityPreset> {
    await simulateDelay(250);

    const c = new Chance();

    const preset: EntityPreset = {
      id: entityPresetId,
      user: {
        id: '1',
        name: 'Panchem',
        imageURL: 'https://api.adorable.io/avatars/285/abott@adorable.png',
      },
      name: c.word(),
      imageId: 'shrug',
      description: c.paragraph(),
      inventory: {
        items: [],
      },
      attributes: [
        {
          name: 'Class',
          description: 'The class of your character',
          imageId: 'uncertainty',
          type: AttributeType.ENUM,
          required: true,
          options: ['Barbarian', 'Aes Sedai', 'Construct'],
        },
      ],
      health: {
        mode: HealthMode.NORMAL,
      },
      playerCreatable: c.bool(),
    };

    for (let i = 0; i < 10; i++) {
      preset.attributes.push({
        name: c.word(),
        description: c.paragraph({ sentences: 1 }),
        imageId: 'uncertainty',
        type: c.integer({ min: 0, max: 1 }) as AttributeType,
        defaultValue: c.integer({ min: 0, max: 249 }).toString(),
        required: c.bool(),
        min: c.integer({ min: -20, max: 20 }),
        max: c.integer({ min: 250, max: 60000 }),
      });
    }

    return preset;
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

    ent.preset = await this.getEntityPreset(campaignId, '1');

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

// Used in mock apis, will be removed
const simulateDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
