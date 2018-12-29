import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Item } from '../item';
import { AttributeEditorComponent } from '../attribute-editor/attribute-editor.component';

@Component({
  selector: 'dd-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {
  @Input()
  public inputItem: Item;

  public formGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    if (this.inputItem !== undefined) {
      this.formGroup = new FormGroup({
        name: new FormControl(this.inputItem.name, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(60),
        ]),
        description: new FormControl(
          this.inputItem.description,
          Validators.required
        ),
        imageId: new FormControl(this.inputItem.imageId),
        attributes: AttributeEditorComponent.createAttributesControl(
          this.inputItem.attributes
        ),
      });
    } else {
      this.formGroup = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        imageId: new FormControl('cvgvysrwdivcxjfipjry'),
      });
    }
  }

  public get name() {
    return this.formGroup.controls.name;
  }

  public get description() {
    return this.formGroup.controls.description;
  }
}
