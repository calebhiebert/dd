import { Session } from './session';
import { Character } from './character';
import { Item } from './item';
import { User } from './user';

export class Campaign {
  public id: string;
  public user: User;
  public name: string;
  public description: string;

  public items: Item[];
  public sessions: Session[];
  public characters: Character[];
}
