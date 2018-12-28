import { InventoryItem } from './inventory';

export class Session {
  public id: string;
  public startTime: Date;
  public endTime: Date;
  public events: Event[];
  public itemPool: InventoryItem[];
}
