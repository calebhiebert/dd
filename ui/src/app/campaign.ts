import { Session } from './session';
import { Character } from './character';
import { Item } from './item';
import { User } from './user';

export interface Campaign {
  id: string;
  user: User;
  name: string;
  description: string;

  items: Item[];
  sessions: Session[];
  characters: Character[];
}
