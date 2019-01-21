import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  ValidationErrors,
  Validators,
  AbstractControl
} from '@angular/forms';
import { numberValidator } from 'src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component';
import { ICampaign } from 'src/app/campaign.service';
import {
  XpTablePresetsService,
  IXPTablePreset
} from 'src/app/xp-table-presets.service';
import { ModalComponent } from 'src/app/modal/modal.component';

// TODO move this to a validators file or something
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

@Component({
  selector: 'dd-experience-table-editor',
  templateUrl: './experience-table-editor.component.html',
  styleUrls: ['./experience-table-editor.component.css']
})
export class ExperienceTableEditorComponent implements OnInit {
  @Input()
  public campaign: ICampaign;

  @Input()
  public formGroup: FormGroup;

  @ViewChild('presets')
  public presetsModal: ModalComponent<void>;

  public presetList: IXPTablePreset[];

  constructor(private presets: XpTablePresetsService) {}

  ngOnInit() {
    if (!this.campaign) {
      throw new Error('The param campaign is required!');
    }

    this.presets.getPresets().then(p => (this.presetList = p));

    this.formGroup.addControl(
      'experienceTable',
      new FormArray(
        this.campaign.experienceTable.map(xp => this.createRow(xp)),
        xpTest
      )
    );
  }

  private createRow(xp?: number): AbstractControl {
    return new FormControl(xp ? xp : 0, [
      Validators.required,
      Validators.min(0),
      numberValidator
    ]);
  }

  public usePreset(preset: IXPTablePreset) {
    this.formArray.controls = preset.xpTable.map(xp => this.createRow(xp));
    this.presetsModal.close(null);
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
