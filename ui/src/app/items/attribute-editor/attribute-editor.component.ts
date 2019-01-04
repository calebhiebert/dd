import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Attribute, AttributeType } from 'src/app/attributes';

@Component({
  selector: 'dd-attribute-editor',
  templateUrl: './attribute-editor.component.html',
  styleUrls: ['./attribute-editor.component.css'],
})
export class AttributeEditorComponent implements OnInit {
  @Input()
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public static createAttributesControl(attributes: Attribute[]): FormArray {
    const controls: FormGroup[] = [];

    for (const attr of attributes) {
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
      name: new FormControl(presetName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      data: new FormControl(presetValue, [Validators.required, Validators.maxLength(255)]),
      type: new FormControl(presetType ? presetType.toString() : AttributeType.STRING.toString(), Validators.required),
    });
  }

  ngOnInit() {
    if (!this.formGroup.contains('attributes')) {
      this.formGroup.addControl('attributes', this.formBuilder.array([]));
      this.addAttribute('Weight', AttributeType.NUMBER, '10');
    }

    console.log(this.formGroup);
  }

  public addAttribute(presetName?: string, presetType?: AttributeType, presetValue?: string) {
    const attributes = this.formGroup.get('attributes') as FormArray;
    attributes.push(AttributeEditorComponent.createAttributeFormItem(presetName, presetType, presetValue));
  }

  public removeAttribute(i: number) {
    const attributes = this.formGroup.get('attributes') as FormArray;
    attributes.removeAt(i);
  }

  public getNameErrors(i: number) {
    return this.formGroup.get(['attributes', i, 'name']).errors;
  }

  public getDataErrors(i: number) {
    return this.formGroup.get(['attributes', i, 'data']).errors;
  }

  public getTypeErrors(i: number) {
    return this.formGroup.get(['attributes', i, 'type']).errors;
  }

  public attributeRowHasError(i: number): boolean {
    return this.formGroup.get(['attributes', i]).valid;
  }

  public get attributeControls() {
    return (<FormArray>this.formGroup.get('attributes')).controls;
  }
}
