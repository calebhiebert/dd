import { User } from './user';
import { Inventory } from './inventory';
import { AttributeType, Attribute } from './attributes';

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
  health: HealthPreset;
  playerCreatable: boolean;
}

export interface HealthPreset {
  mode: HealthMode;
  max?: number;
}

export enum HealthMode {
  NORMAL,
  MULTI_BAR,
}

export interface Health {
  mode: HealthMode;

  normal?: {
    max: number;
    current: number;
    temp: number;
  };

  multiBar?: {
    bars: number[];
    current: number;
  };
}

export interface Entity {
  id: string;
  name: string;
  description: string;
  imageId?: string;
  attributes: Attribute[];
  xp: number;
  inventory: Inventory;
  health: Health;
  preset?: EntityPreset;
}
