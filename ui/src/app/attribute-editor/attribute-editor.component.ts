import { Component, OnInit, Input } from '@angular/core';
import { AttributeCollection, AttributeType } from '../attributes';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dd-attribute-editor',
  templateUrl: './attribute-editor.component.html',
  styleUrls: ['./attribute-editor.component.css'],
})
export class AttributeEditorComponent implements OnInit {
  @Input()
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public static createAttributesControl(attributes: AttributeCollection): FormArray {
    const controls: FormGroup[] = [];

    for (const attr of attributes.attributes) {
      controls.push(this.createAttributeFormItem(attr.name, attr.type, attr.data));
    }

    return new FormArray(controls);
  }

  private static createAttributeFormItem(
    presetName?: string,
    presetType?: AttributeType,
    presetValue?: string,
  ): FormGroup {
    return new FormGroup({
      name: new FormControl(presetName, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      data: new FormControl(presetValue),
      type: new FormControl(presetType ? presetType.toString() : AttributeType.STRING.toString(), Validators.required),
    });
  }

  ngOnInit() {
    if (!this.formGroup.contains('attributes')) {
      this.formGroup.addControl('attributes', this.formBuilder.array([]));
      this.addAttribute('Weight', AttributeType.NUMBER, '10');
    }
  }

  public addAttribute(presetName?: string, presetType?: AttributeType, presetValue?: string) {
    const attributes = this.formGroup.get('attributes') as FormArray;
    attributes.push(AttributeEditorComponent.createAttributeFormItem(presetName, presetType, presetValue));
  }

  public removeAttribute(i: number) {
    const attributes = this.formGroup.get('attributes') as FormArray;
    attributes.removeAt(i);
  }

  public get attributeControls() {
    return (<FormArray>this.formGroup.get('attributes')).controls;
  }
}
