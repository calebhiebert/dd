import { Injectable } from '@angular/core';
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

  public async saveItem(item: IItem): Promise<IItem> {
    await simulateDelay(250);
    return item;
  }

  public async getItem(id: string): Promise<IItem> {
    if (id === '1') {
      const c = new Chance();

      const item: IItem = {
        id: id,
        name: '--_blank_--',
        description: '--_blank_--',
        imageId: 'uncertainty',
        rarity: 0,
        type: '',
      };

      return item;
    }
    const c = new Chance();

    const item: IItem = {
      id: id,
      name: c.sentence({ words: c.integer({ min: 1, max: 3 }) }),
      description: c.paragraph(),
      imageId: 'uncertainty',
      rarity: 0,
      type: '',
    };

    return item;
  }

  public async deleteItem(id: string): Promise<void> {
    await simulateDelay(255);
  }
}

export interface IItem {
  id: string;
  name: string;
  description: string;
  imageId?: string;
  rarity: number;
  type: string;
  tags?: string[];
}

// Used in mock apis, will be removed
const simulateDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
