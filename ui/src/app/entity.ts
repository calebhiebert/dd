import { User } from './user';
import { Attributes } from './attributes';
import { Inventory } from './inventory';

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
  type: EntityAttributeType;
  options?: string[];

  required: boolean;
  max?: number;
  min?: number;
}

export enum EntityAttributeType {
  STRING,
  NUMBER,
  ENUM,
}

export interface Entity {
  id: string;
  user: User;
  name: string;
  attributes: Attributes;
  inventory: Inventory;
  health: Health;
}

export interface Health {
  max: number;
  current: number;
}
