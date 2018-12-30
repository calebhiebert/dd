import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dd-entity-attribute-row-editor',
  templateUrl: './entity-attribute-row-editor.component.html',
  styleUrls: ['./entity-attribute-row-editor.component.css'],
})
export class EntityAttributeRowEditorComponent implements OnInit {
  public minControl: FormControl;
  public maxControl: FormControl;

  public validateMin = false;
  public validateMax = false;

  public formGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    this.minControl = new FormControl(false);
    this.maxControl = new FormControl(false);

    this.minControl.valueChanges.subscribe((v) => {
      this.validateMin = v;
    });

    this.maxControl.valueChanges.subscribe((v) => {
      this.validateMax = v;
    });

    this.formGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
      ]),
      description: new FormControl(null, [Validators.required]),
      type: new FormControl(0, [Validators.required]),
      required: new FormControl(true, [Validators.required]),
      min: new FormControl(null),
      max: new FormControl(null),
      options: new FormControl(null, [
        Validators.pattern(/([A-Za-z0-9._]+)/gi),
      ]),
    });

    this.formGroup.valueChanges.subscribe(console.log);
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get description() {
    return this.formGroup.get('description');
  }

  public get type() {
    return this.formGroup.get('type');
  }

  public get required() {
    return this.formGroup.get('required');
  }

  public get min() {
    return this.formGroup.get('min');
  }

  public get max() {
    return this.formGroup.get('max');
  }

  public get options() {
    return this.formGroup.get('options');
  }

  public get optionsList(): string[] {
    if (this.options.value) {
      return (this.options.value as string)
        .split(',')
        .map((o) => o.trim())
        .filter((o) => o.length > 0);
    } else {
      return [];
    }
  }
}
