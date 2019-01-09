import { Session } from './session';
import { Item } from './item';
import { User } from './user';
import { EntityPreset, Entity } from './entity';

export interface Campaign {
  id: string;
  user: User;
  name: string;
  description: string;
  imageId?: string;

  users: CampaignUser[];
  items: Item[];
  sessions: Session[];
  entityPresets: EntityPreset[];
  entities: Entity[];
  experienceTable: number[];
}

export interface CampaignUser {
  user: User;
  isAdmin: boolean;
}