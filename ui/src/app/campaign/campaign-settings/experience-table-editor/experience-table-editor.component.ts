import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  ValidationErrors,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { numberValidator } from 'src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component';
import { Campaign } from 'src/app/campaign';

@Component({
  selector: 'dd-experience-table-editor',
  templateUrl: './experience-table-editor.component.html',
  styleUrls: ['./experience-table-editor.component.css'],
})
export class ExperienceTableEditorComponent implements OnInit {
  @Input()
  public campaign: Campaign;

  @Input()
  public formGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    if (!this.campaign) {
      throw new Error('The param campaign is required!');
    }

    this.formGroup.addControl(
      'experienceTable',
      new FormArray(
        this.campaign.experienceTable.map((xp) => this.createRow(xp)),
        xpTest
      )
    );
  }

  private createRow(xp?: number): AbstractControl {
    return new FormControl(xp ? xp : 0, [
      Validators.required,
      Validators.min(0),
      numberValidator,
    ]);
  }

  public addRow() {
    this.formArray.push(this.createRow());
  }

  public removeRow() {
    this.formArray.removeAt(this.controls.length - 1);
  }

  public hasOrderError(i: number) {
    return this.formArray.errors && this.formArray.errors[`order-${i}`];
  }

  public get formArray() {
    return this.formGroup.get('experienceTable') as FormArray;
  }

  public get controls() {
    return this.formArray.controls;
  }
}

export const xpTest: ValidatorFn = (
  control: FormArray
): ValidationErrors | null => {
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
