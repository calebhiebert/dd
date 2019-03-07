import { Component, OnInit, forwardRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CampaignService } from 'src/app/campaign.service';
import { DynamicFieldType } from '../form-types';
import { IconPickerComponent } from 'src/app/icon-picker/icon-picker.component';

@Component({
  selector: 'dd-field-definition-form',
  templateUrl: './field-definition-form.component.html',
  styleUrls: ['./field-definition-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldDefinitionFormComponent),
      multi: true,
    },
  ],
})
export class FieldDefinitionFormComponent
  implements OnInit, ControlValueAccessor {
  public formGroup: FormGroup;
  public options: FormGroup;

  private _onChange: any;
  private _onTouched: any;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      description: new FormControl(null),
      type: new FormControl(null),
      imageId: new FormControl(null),
    });

    this.formGroup.get('type').valueChanges.subscribe((type) => {
      type = parseInt(type, 10);
      this.options = this.createOptionsFormGroup(type);
      this.formGroup.setControl('options', this.options);
    });

    this.formGroup.valueChanges.subscribe((val) => {
      if (this._onChange) {
        this._onChange(val);
      }
    });
  }

  private createOptionsFormGroup(type: DynamicFieldType) {
    switch (type) {
      case DynamicFieldType.STRING:
        return new FormGroup({
          maxLength: new FormControl(null),
          minLength: new FormControl(null),
        });

      case DynamicFieldType.INT:
      case DynamicFieldType.FLOAT:
        return new FormGroup({
          min: new FormControl(null),
          max: new FormControl(null),
        });

      case DynamicFieldType.ENUM:
      case DynamicFieldType.ENUM_MULTI:
        return new FormGroup({
          choices: new FormArray([]),
        });
    }
  }

  writeValue(obj: any): void {
    if (obj !== null && obj !== undefined) {
      this.formGroup.patchValue(obj);
    }
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  public get campaign() {
    return this.campaignService.campaign;
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get type() {
    return this.formGroup.get('type');
  }
}
