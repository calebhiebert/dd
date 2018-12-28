import { Attributes, AttributeCollection } from './attributes';

export class Item {
  public id: string;
  public name: string;
  public description: string;
  public imageId: string;
  public attributes: AttributeCollection;
}
