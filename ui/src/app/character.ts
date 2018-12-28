import { User } from './user';
import { Attributes } from './attributes';
import { Inventory } from './inventory';

export class Character {
  public id: string;
  public user: User;
  public name: string;
  public attributes: Attributes;
  public inventory: Inventory;
}
