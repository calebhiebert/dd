import { Component, OnInit, Input } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { IEntityAttribute } from 'src/app/entity.service';
import { AttributeType } from 'src/app/attributes';
import { numberValidator } from 'src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component';
import {
  IDynamicFieldConfig,
  DynamicFieldType,
  DynamicFieldOptions,
  IStringFieldOptions,
  INumberFieldOptions,
  IFloatFieldOptions,
  IEnumFieldOptions,
} from '../form-types';

@Component({
  selector: 'dd-field-base',
  template: 'NO UI!',
  styles: [],
})
export class FieldBaseComponent implements OnInit {
  @Input()
  public attribute: IEntityAttribute;

  @Input()
  public config: IDynamicFieldConfig;

  @Input()
  public control: FormControl;

  private _fieldConfigCache: IDynamicFieldConfig;

  constructor() {}

  ngOnInit() {
    this.control.setValidators(this.getValidators(this.fieldConfig));
  }

  private getValidators(config: IDynamicFieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    const options = config.options || this.getDefaultSettings();

    if (config.type === DynamicFieldType.STRING) {
      const opt = options as IStringFieldOptions;

      if (opt.minLength !== null && opt.minLength !== undefined) {
        validators.push(Validators.minLength(opt.minLength));
      }

      if (
        opt.maxLength &&
        opt.maxLength !== null &&
        opt.maxLength !== undefined
      ) {
        validators.push(Validators.maxLength(opt.maxLength));
      }

      if (opt.pattern) {
        validators.push(Validators.pattern(opt.pattern));
      }
    } else if (
      config.type === DynamicFieldType.INT ||
      config.type === DynamicFieldType.FLOAT
    ) {
      const opt = options as INumberFieldOptions;

      if (opt.min !== null && opt.min !== undefined) {
        validators.push(Validators.min(opt.min));
      }

      if (opt.max !== null && opt.max !== undefined) {
        validators.push(Validators.max(opt.max));
      }
    }

    if (options.required) {
      validators.push(Validators.required);
    }

    return validators;
  }

  private mapAttributeTypeToFieldConfigType(
    attributeType: AttributeType
  ): DynamicFieldType {
    switch (attributeType) {
      case AttributeType.BIG_TEXT:
        return DynamicFieldType.TEXT_FORMATTED;
      case AttributeType.ENUM:
        return DynamicFieldType.ENUM;
      case AttributeType.NUMBER:
        return DynamicFieldType.INT;
      case AttributeType.SELECT_MULTI:
        return DynamicFieldType.ENUM_MULTI;
      case AttributeType.STRING:
        return DynamicFieldType.STRING;
    }
  }

  private mapAttributeOptionsToFieldConfigOptions(
    attribute: IEntityAttribute
  ): DynamicFieldOptions {
    const options = this.getDefaultSettings();
    const type = this.mapAttributeTypeToFieldConfigType(attribute.type);

    if (type === DynamicFieldType.STRING) {
      const opt = options as IStringFieldOptions;
      opt.minLength = attribute.min;
      opt.maxLength = attribute.max;
    } else if (
      type === DynamicFieldType.INT ||
      type === DynamicFieldType.FLOAT
    ) {
      const opt = options as IFloatFieldOptions;
      opt.step = 0.01;
      opt.max = attribute.max;
      opt.min = attribute.min;
    } else if (
      type === DynamicFieldType.ENUM ||
      type === DynamicFieldType.ENUM_MULTI
    ) {
      const opt = options as IEnumFieldOptions;
      opt.choices = attribute.options;
    }

    options.required = attribute.required;

    return options;
  }

  private getDefaultSettings(): DynamicFieldOptions {
    return {};
  }

  public get errors() {
    return this.control.errors as any;
  }

  public get fieldConfig(): IDynamicFieldConfig {
    if (!this.config && !this._fieldConfigCache) {
      this._fieldConfigCache = {
        name: this.attribute.name,
        description: this.attribute.description,
        imageId: this.attribute.imageId,
        defaultValue: this.attribute.defaultValue,
        type: this.mapAttributeTypeToFieldConfigType(this.attribute.type),
        options: this.mapAttributeOptionsToFieldConfigOptions(this.attribute),
      };
    }

    if (this.config) {
      return this.config;
    } else {
      return this._fieldConfigCache;
    }
  }
}
