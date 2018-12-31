import { User } from './user';
import { Inventory } from './inventory';
import { AttributeType } from './attributes';

export interface EntityType {
  id: string;
  user: User;
  name: string;
}

export interface EntityAttribute {
  name: string;
  description?: string;
  imageId?: string;
  defaultValue?: string;
  type: AttributeType;
  options?: string[];

  required: boolean;
  max?: number;
  min?: number;
}

export interface EntityPreset {
  id: string;
  user: User;
  name: string;
  description: string;
  imageId?: string;
  attributes: EntityAttribute[];
  inventory: Inventory;
  health: Health;
  playerCreatable: boolean;
}

export interface Health {
  mode: HealthMode;
  max?: number;
}

export enum HealthMode {
  NORMAL,
  MULTI_BAR,
}
