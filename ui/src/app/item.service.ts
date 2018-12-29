import { Injectable } from '@angular/core';
import { Item } from './item';
import { AttributeType } from './attributes';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor() {}

  public async createItem(item: Item): Promise<Item> {
    item.id = '1';
    return item;
  }

  public async saveItem(item: Item): Promise<Item> {
    await simulateDelay(250);
    return item;
  }

  public async getItem(id: string): Promise<Item> {
    const item: Item = {
      id: id,
      name: 'Sword of Agatha',
      description: 'A really sharp metal sword',
      imageId: 'cvgvysrwdivcxjfipjry',
      attributes: [{ name: 'Weight', data: '6', type: AttributeType.NUMBER }],
    };

    return item;
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
