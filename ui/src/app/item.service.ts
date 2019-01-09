import { Injectable } from '@angular/core';
import { Item } from './item';
import { AttributeType } from './attributes';
import { Chance } from 'chance';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor() {}

  public async createItem(): Promise<string> {
    await simulateDelay(250);
    return '1';
  }

  public async saveItem(item: Item): Promise<Item> {
    await simulateDelay(250);
    return item;
  }

  public async getItem(id: string): Promise<Item> {
    if (id === '1') {
      const c = new Chance();

      const item: Item = {
        id: id,
        name: '--_blank_--',
        description: '--_blank_--',
        imageId: 'uncertainty',
        attributes: [{ name: 'Weight', data: '6', type: AttributeType.NUMBER }],
      };

      return item;
    }
    const c = new Chance();

    const item: Item = {
      id: id,
      name: c.sentence({ words: c.integer({ min: 1, max: 3 }) }),
      description: c.paragraph(),
      imageId: 'uncertainty',
      attributes: [{ name: 'Weight', data: '6', type: AttributeType.NUMBER }],
    };

    return item;
  }

  public async deleteItem(id: string): Promise<void> {
    await simulateDelay(255);
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