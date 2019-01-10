import { IItem } from './item.service';

export interface Inventory {
  items: InventoryItem[];
}

export interface InventoryItem {
  item: IItem;
  quantity: number;
}
