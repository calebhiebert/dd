import { Injectable } from '@angular/core';
import { Item } from './item';
import { AttributeType } from './attributes';
import { Chance } from 'chance';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor() {}

  public async createItem(item: Item): Promise<Item> {
    await simulateDelay(250);
    item.id = '1';
    return item;
  }

  public async saveItem(item: Item): Promise<Item> {
    await simulateDelay(250);
    return item;
  }

  public async getItem(id: string): Promise<Item> {
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
