import { Component, OnInit, Input } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { IEntityAttribute } from 'src/app/entity.service';
import { AttributeType } from 'src/app/attributes';
import { numberValidator } from 'src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component';

@Component({
  selector: 'dd-field-base',
  template: 'NO UI!',
  styles: [],
})
export class FieldBaseComponent implements OnInit {
  @Input()
  public attribute: IEntityAttribute;

  @Input()
  public control: FormControl;

  constructor() {}

  ngOnInit() {
    this.control.setValidators(this.getValidators(this.attribute));
  }

  private getValidators(attribute: IEntityAttribute): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (attribute.type === AttributeType.STRING) {
      if (attribute.min !== undefined && attribute.min !== null) {
        validators.push(Validators.minLength(attribute.min));
      }

      if (attribute.max !== undefined && attribute.max !== null) {
        validators.push(Validators.maxLength(attribute.max));
      }
    } else if (attribute.type === AttributeType.NUMBER) {
      if (attribute.min !== undefined && attribute.min !== null) {
        validators.push(Validators.min(attribute.min));
      }

      if (attribute.max !== undefined && attribute.max !== null) {
        validators.push(Validators.max(attribute.max));
      }

      validators.push(numberValidator);
    }

    if (attribute.required) {
      validators.push(Validators.required);
    }

    return validators;
  }

  public get errors() {
    return this.control.errors as any;
  }
}
