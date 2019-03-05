import { ICurrencyLevel } from '../campaign.service';

export interface IDynamicFieldConfig {
  name: string;
  description?: string;
  imageId?: string;
  defaultValue: any;
  type: DynamicFieldType;
  options?: DynamicFieldOptions;
}

export interface IFieldOptions {
  required?: boolean;
}

export interface IStringFieldOptions extends IFieldOptions {
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
}

export interface INumberFieldOptions extends IFieldOptions {
  min?: number;
  max?: number;
}

export interface IFloatFieldOptions extends INumberFieldOptions {
  step?: number;
}

export interface IEnumFieldOptions extends IFieldOptions {
  choices: string[];
}

export interface IEnumMultiFieldOptions extends IEnumFieldOptions {
  maxSelected?: number;
  minSelected?: number;
}

export interface ITextFormattedFieldOptions extends IFieldOptions {
  simple?: boolean;
}

export interface ICurrencyFieldOptions extends IFieldOptions {
  levels: ICurrencyLevel[];
  trackCoins?: boolean;
}

export type DynamicFieldOptions =
  | IFieldOptions
  | IStringFieldOptions
  | INumberFieldOptions
  | IFloatFieldOptions
  | IEnumFieldOptions
  | IEnumMultiFieldOptions
  | ITextFormattedFieldOptions
  | ICurrencyFieldOptions;

export enum DynamicFieldType {
  STRING,
  INT,
  FLOAT,
  ENUM,
  ENUM_MULTI,
  TEXT_FORMATTED,
  CURRENCY,
}
