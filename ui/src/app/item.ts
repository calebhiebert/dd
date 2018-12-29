import { Attribute } from './attributes';

export interface Item {
  id: string;
  name: string;
  description: string;
  imageId: string;
  attributes: Attribute[];
}
