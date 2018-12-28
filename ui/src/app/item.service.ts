import { Injectable } from '@angular/core';
import { Item } from './item';
import { AttributeCollection, AttributeType } from './attributes';

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
    const item = new Item();
    item.name = 'Sword of Agatha';
    item.description = 'A really sharp metal sword';
    item.id = id;
    item.imageId = 'cvgvysrwdivcxjfipjry';
    item.attributes = new AttributeCollection();
    item.attributes.addAttribute({
      name: 'Weight',
      data: '6',
      type: AttributeType.NUMBER,
    });

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
