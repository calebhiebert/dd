import { Injectable } from '@angular/core';
import { EntityPreset, HealthMode } from './entity';
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
        type: AttributeType.NUMBER,
        required: c.bool(),
        min: c.integer(),
        max: c.integer(),
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
}

// Used in mock apis, will be removed
const simulateDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
