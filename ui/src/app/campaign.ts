import { Session } from './session';
import { Item } from './item';
import { User } from './user';
import { EntityPreset } from './entity';

export interface Campaign {
  id: string;
  user: User;
  name: string;
  description: string;

  items: Item[];
  sessions: Session[];
  entityPresets: EntityPreset[];
}
