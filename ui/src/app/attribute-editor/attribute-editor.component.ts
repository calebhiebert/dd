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

  ngOnInit() {
    this.formGroup.addControl('attributes', this.formBuilder.array([]));

    this.addAttribute('Weight', AttributeType.NUMBER, '10');
  }

  private createAttributeFormItem(presetName?: string, presetType?: AttributeType, presetValue?: string): FormGroup {
    return new FormGroup({
      name: new FormControl(presetName, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      data: new FormControl(presetValue),
      type: new FormControl(presetType ? presetType.toString() : AttributeType.STRING.toString(), Validators.required),
    });
  }

  public addAttribute(presetName?: string, presetType?: AttributeType, presetValue?: string) {
    const attributes = this.formGroup.get('attributes') as FormArray;
    attributes.push(this.createAttributeFormItem(presetName, presetType, presetValue));
  }

  public removeAttribute(i: number) {
    const attributes = this.formGroup.get('attributes') as FormArray;
    attributes.removeAt(i);
  }
}
