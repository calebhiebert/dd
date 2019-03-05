import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AttributeType, Attribute } from 'src/app/attributes';
import { IEntityAttribute, IAttribute } from 'src/app/entity.service';

// TODO move this to some sort of validator file
export const numberValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (
    control.value !== null &&
    control.value !== undefined &&
    control.value !== ''
  ) {
    try {
      parseFloat(control.value);
    } catch (err) {
      return {
        number: true,
      };
    }
  }
};

@Component({
  selector: 'dd-dynamic-attribute-form',
  templateUrl: './dynamic-attribute-form.component.html',
  styleUrls: ['./dynamic-attribute-form.component.css'],
})
export class DynamicAttributeFormComponent implements OnInit {
  private _attributes: IEntityAttribute[];

  @Input()
  public formGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    this.resetControls();
  }

  private resetControls() {
    this.formGroup.controls = {};

    for (const attr of this.attributes) {
      const validators: ValidatorFn[] = [];

      if (attr.type === AttributeType.STRING) {
        if (attr.min !== undefined && attr.min !== null) {
          validators.push(Validators.minLength(attr.min));
        }

        if (attr.max !== undefined && attr.max !== null) {
          validators.push(Validators.maxLength(attr.max));
        }
      } else if (attr.type === AttributeType.NUMBER) {
        if (attr.min !== undefined && attr.min !== null) {
          validators.push(Validators.min(attr.min));
        }

        if (attr.max !== undefined && attr.max !== null) {
          validators.push(Validators.max(attr.max));
        }

        validators.push(numberValidator);
      }

      if (attr.required) {
        validators.push(Validators.required);
      }

      if (attr.type === AttributeType.ENUM && attr.defaultValue === undefined) {
        this.formGroup.addControl(
          attr.name,
          new FormControl(attr.options[0], validators)
        );
      } else {
        this.formGroup.addControl(
          attr.name,
          new FormControl(attr.defaultValue, validators)
        );
      }
    }
  }

  public constructAttributes(): Attribute[] {
    const attributes: Attribute[] = [];

    for (const attr of this.attributes) {
      attributes.push({
        name: attr.name,
        type: attr.type,
        data: this.formGroup.get(attr.name).value,
      });
    }

    return attributes;
  }

  public control(name: string): AbstractControl {
    return this.formGroup.get(name);
  }

  public trackAttribute(idx: number, attr: IEntityAttribute) {
    return attr.name;
  }

  @Input()
  public set attributes(value) {
    this._attributes = value;
    this.resetControls();
  }

  public get attributes() {
    return this._attributes;
  }
}
