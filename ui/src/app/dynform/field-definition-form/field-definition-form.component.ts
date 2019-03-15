import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CampaignService } from 'src/app/campaign.service';
import { DynamicFieldType, IDynamicFieldConfig, DynamicFieldOptions, IStringFieldOptions, IEnumFieldOptions } from '../form-types';
import { Chance } from 'chance';

@Component({
  selector: 'dd-field-definition-form',
  templateUrl: './field-definition-form.component.html',
  styleUrls: ['./field-definition-form.component.css'],
})
export class FieldDefinitionFormComponent implements OnInit {
  @Input()
  public formGroup: FormGroup;

  public options: FormGroup;
  public hideExtra = true;
  public uniqueFieldId: string;

  constructor(private campaignService: CampaignService) {
    this.uniqueFieldId = new Chance().guid();
  }

  public static createFormGroup(config: IDynamicFieldConfig): FormGroup {
    if (config === null || config === undefined) {
      config = {
        name: null,
        type: null,
      };
    }

    return new FormGroup({
      name: new FormControl(config.name, [Validators.required, Validators.maxLength(30)]),
      description: new FormControl(config.description),
      type: new FormControl(config.type, [Validators.required]),
      imageId: new FormControl(config.imageId),
      options: this.createOptionsFormGroup(config.type, config.options),
    });
  }

  private static createOptionsFormGroup(type: DynamicFieldType, options: DynamicFieldOptions) {
    if (options === undefined || options === null) {
      options = {};
    }

    let opt;
    switch (type) {
      case DynamicFieldType.STRING:
        opt = options as IStringFieldOptions;
        return new FormGroup({
          maxLength: new FormControl(opt.maxLength),
          minLength: new FormControl(opt.minLength),
          required: new FormControl(opt.required),
        });

      case DynamicFieldType.INT:
      case DynamicFieldType.FLOAT:
        opt = options as IStringFieldOptions;

        return new FormGroup({
          min: new FormControl(opt.min),
          max: new FormControl(opt.max),
          required: new FormControl(opt.required),
        });

      case DynamicFieldType.ENUM:
      case DynamicFieldType.ENUM_MULTI:
        opt = options as IEnumFieldOptions;
        return new FormGroup({
          choices: new FormArray(opt.choices ? opt.choices.map((c) => new FormControl(c)) : []),
          required: new FormControl(opt.required),
        });
      default:
        return new FormGroup({
          required: new FormControl(options.required),
        });
    }
  }

  ngOnInit() {
    this.formGroup.get('type').valueChanges.subscribe((type) => {
      type = parseInt(type, 10);

      this.options = FieldDefinitionFormComponent.createOptionsFormGroup(type, this.formGroup.value.options);
      this.formGroup.setControl('options', this.options);
    });

    this.options = FieldDefinitionFormComponent.createOptionsFormGroup(this.type.value, this.formGroup.value.options);
    this.formGroup.setControl('options', this.options);
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
