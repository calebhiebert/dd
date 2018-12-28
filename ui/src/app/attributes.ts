export class AttributeCollection {
  public attributes: Attribute[];

  constructor() {
    this.attributes = [];
  }

  public getAttribute(name: string): Attribute {
    for (const attr of this.attributes) {
      if (attr.name === name) {
        return attr;
      }
    }

    return null;
  }

  public addAttribute(attribute: Attribute) {
    this.attributes.push(attribute);
  }
}

export interface Attributes {
  attributes: Attribute[];
}

export interface Attribute {
  name: string;
  type: AttributeType;
  data: string;
}

export enum AttributeType {
  STRING,
  NUMBER,
}
