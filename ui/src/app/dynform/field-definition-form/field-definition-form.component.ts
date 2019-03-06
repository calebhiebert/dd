import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CampaignService } from 'src/app/campaign.service';
import { DynamicFieldType } from '../form-types';

@Component({
  selector: 'dd-field-definition-form',
  templateUrl: './field-definition-form.component.html',
  styleUrls: ['./field-definition-form.component.css'],
})
export class FieldDefinitionFormComponent implements OnInit {
  public formGroup: FormGroup;
  public options: FormGroup;

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
