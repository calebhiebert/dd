import { User } from './user';
import { Inventory } from './inventory';
import { Attribute, AttributeType } from './attributes';

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

export interface Entity {
  id: string;
  user: User;
  name: string;
  attributes: Attribute[];
  inventory: Inventory;
  health: Health;
}

export interface Health {
  max: number;
  current: number;
}
