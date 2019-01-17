import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalComponent } from 'src/app/modal/modal.component';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { AttributeType } from 'src/app/attributes';
import { numberValidator } from '../../dynamic-attribute-form/dynamic-attribute-form.component';
import { IEntityAttribute } from 'src/app/entity.service';

@Component({
  selector: 'dd-entity-attribute-editor-modal',
  templateUrl: './entity-attribute-editor-modal.component.html',
  styleUrls: ['./entity-attribute-editor-modal.component.css']
})
export class EntityAttributeEditorModalComponent implements OnInit {
  @ViewChild('modal')
  public modal: ModalComponent<string | null>;

  @ViewChild('input')
  public input: ElementRef<HTMLInputElement>;

  public attribute: IEntityAttribute;

  public control: FormControl;

  constructor() {}

  ngOnInit() {}

  public async editAttribute(
    attribute: IEntityAttribute,
    currentValue?: string
  ): Promise<string | null> {
    this.attribute = attribute;
    this.setupControl(currentValue);
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 1);

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
