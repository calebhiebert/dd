import { Component, OnInit, Input } from '@angular/core';
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

  @Input()
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

    this.formGroup.valueChanges.subscribe((v) => {
      if (this.formGroup.value.min) {
        this.minControl.setValue(true);
      }

      if (this.formGroup.value.max) {
        this.maxControl.setValue(true);
      }
    });

    // this should mean that the form group is empty
    if (!this.formGroup.contains('name')) {
      this.formGroup.addControl(
        'name',
        new FormControl(null, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ])
      );

      this.formGroup.addControl(
        'description',
        new FormControl(null, [Validators.required])
      );

      this.formGroup.addControl(
        'type',
        new FormControl('0', [Validators.required])
      );

      this.formGroup.addControl(
        'required',
        new FormControl(true, [Validators.required])
      );

      this.formGroup.addControl('min', new FormControl());
      this.formGroup.addControl('max', new FormControl());

      this.formGroup.addControl(
        'options',
        new FormControl(null, [Validators.pattern(/([A-Za-z0-9._]+)/gi)])
      );
    }
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
