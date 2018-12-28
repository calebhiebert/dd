import { Item } from './item';

export class Inventory {
  public items: InventoryItem[];
}

export interface InventoryItem {
  item: Item;
  quantity: number;
}
