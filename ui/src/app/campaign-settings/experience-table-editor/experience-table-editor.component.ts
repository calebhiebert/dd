import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { numberValidator } from 'src/app/dynamic-attribute-form/dynamic-attribute-form.component';

@Component({
  selector: 'dd-experience-table-editor',
  templateUrl: './experience-table-editor.component.html',
  styleUrls: ['./experience-table-editor.component.css'],
})
export class ExperienceTableEditorComponent implements OnInit {
  @Input()
  public experienceTable: number[];

  public formGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    if (!this.experienceTable) {
      throw new Error('The param experienceTable is required!');
    }

    this.formGroup = new FormGroup({
      rows: new FormArray([], xpTest),
    });

    for (let i = 0; i < this.experienceTable.length; i++) {
      this.addRow();
    }

    this.formGroup.setValue({
      rows: this.experienceTable,
    });

    this.formGroup.valueChanges.subscribe((v) => (this.experienceTable = v.rows));
  }

  public addRow() {
    this.formArray.push(
      new FormControl(0, [Validators.required, Validators.min(0), Validators.max(2147483647), numberValidator]),
    );
  }

  public removeRow() {
    this.formArray.removeAt(this.controls.length - 1);
  }

  public hasOrderError(i: number) {
    return this.formArray.errors && this.formArray.errors[`order-${i}`];
  }

  public get formArray() {
    return this.formGroup.get('rows') as FormArray;
  }

  public get controls() {
    return this.formArray.controls;
  }
}

export const xpTest: ValidatorFn = (control: FormArray): ValidationErrors | null => {
  let lastXP = 0;
  const errObj = {};

  for (let i = 0; i < control.value.length; i++) {
    if (!control.value[i]) {
      continue;
    }

    if (control.value[i] > lastXP) {
      lastXP = control.value[i];
    } else {
      errObj[`order-${i}`] = true;
    }
  }

  if (Object.keys(errObj).length > 0) {
    return errObj;
  } else {
    return null;
  }
};
