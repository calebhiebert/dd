import { Item } from './item';

export interface Inventory {
  items: InventoryItem[];
}

export interface InventoryItem {
  item: Item;
  quantity: number;
}
