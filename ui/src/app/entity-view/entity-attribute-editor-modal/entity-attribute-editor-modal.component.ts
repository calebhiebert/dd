import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EntityAttribute } from 'src/app/entity';
import { ModalComponent } from 'src/app/modal/modal.component';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { AttributeType } from 'src/app/attributes';
import { numberValidator } from 'src/app/dynamic-attribute-form/dynamic-attribute-form.component';

@Component({
  selector: 'dd-entity-attribute-editor-modal',
  templateUrl: './entity-attribute-editor-modal.component.html',
  styleUrls: ['./entity-attribute-editor-modal.component.css'],
})
export class EntityAttributeEditorModalComponent implements OnInit {
  @ViewChild('modal')
  public modal: ModalComponent<string | null>;

  public attribute: EntityAttribute;

  public control: FormControl;

  constructor() {}

  ngOnInit() {}

  public async editAttribute(attribute: EntityAttribute, currentValue?: string): Promise<string | null> {
    this.attribute = attribute;
    this.setupControl(currentValue);
    return this.modal.open();
  }

  public ok() {
    if (this.control.invalid) {
      return;
    }

    this.modal.close(this.control.value);
  }

  public cancel() {
    this.modal.close(null);
  }

  public setupControl(currentValue?: string) {
    const validators: ValidatorFn[] = [];

    if (this.attribute.type === AttributeType.STRING) {
      if (this.attribute.min !== undefined && this.attribute.min !== null) {
        validators.push(Validators.minLength(this.attribute.min));
      }

      if (this.attribute.max !== undefined && this.attribute.max !== null) {
        validators.push(Validators.maxLength(this.attribute.max));
      }
    } else if (this.attribute.type === AttributeType.NUMBER) {
      if (this.attribute.min !== undefined && this.attribute.min !== null) {
        validators.push(Validators.min(this.attribute.min));
      }

      if (this.attribute.max !== undefined && this.attribute.max !== null) {
        validators.push(Validators.max(this.attribute.max));
      }

      validators.push(numberValidator);
    }

    if (this.attribute.required) {
      validators.push(Validators.required);
    }

    this.control = new FormControl(currentValue, validators);
  }
}
