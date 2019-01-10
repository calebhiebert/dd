export interface Attribute {
  name: string;
  type: AttributeType;
  data: string;
}

export enum AttributeType {
  STRING,
  NUMBER,
  ENUM,
  CURRENCY,
}
