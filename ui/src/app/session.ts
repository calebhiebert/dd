import { InventoryItem } from './inventory';

export interface Session {
  id: string;
  startTime: Date;
  endTime: Date;
  events: Event[];
  itemPool: InventoryItem[];
}
