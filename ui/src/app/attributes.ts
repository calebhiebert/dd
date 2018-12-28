export interface Attributes {
  [key: string]: Attribute;
}

export interface Attribute {
  name: string;
  type: AttributeType;
  sData: string;
  nData: number;
}

export enum AttributeType {
  STRING,
  NUMBER,
  ENUM,
}
