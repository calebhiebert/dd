import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { EntityService, IEntity, HealthType, IEntityFieldConfig } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { numberValidator } from '../../dynamic-attribute-form/dynamic-attribute-form.component';
import { LoginService } from 'src/app/login.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ComponentCanDeactivate } from 'src/app/unsaved-changes.guard';
import { IDynamicFieldConfig, DynamicFieldType } from 'src/app/dynform/form-types';
import { IConceptField } from 'src/app/concept.service';

@Component({
  selector: 'dd-entity-creation-form',
  templateUrl: './entity-creation-form.component.html',
  styleUrls: ['./entity-creation-form.component.css'],
})
export class EntityCreationFormComponent implements OnInit, ComponentCanDeactivate {
  public loading = false;

  public saving = false;

  public formGroup: FormGroup;

  public attributesFormGroup: FormGroup;

  public entity: IEntity;

  private _entTypeId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private entityService: EntityService,
    private campaignService: CampaignService,
    private login: LoginService,
    private location: Location
  ) {}

  ngOnInit() {
    this._entTypeId = this.route.snapshot.paramMap.get('ent_type_id');

    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      content: new FormControl(null),
      spawnable: new FormControl(false),
      xp: new FormControl(0, [numberValidator, Validators.min(0)]),
      currency: new FormControl(null, [numberValidator, Validators.min(0)]),
      health: new FormGroup({
        max: new FormControl(null, [numberValidator, Validators.min(1)]),
        current: new FormControl(null, [numberValidator, Validators.min(0)]),
        textDamageLevels: new FormArray([]),
      }),
      fields: new FormArray([]),
      imageId: new FormControl('uncertainty'),
      imageColor1: new FormControl('#fff'),
      imageColor2: new FormControl('#000'),
    });

    this.attributesFormGroup = new FormGroup({});

    this.route.paramMap.subscribe((params) => {
      const id = params.get('ent_id');
      this._entTypeId = params.get('ent_type_id');

      if (this.editing) {
        this.loadEntity(id);
      }
    });

    this.preset.fields.forEach(() => {
      this.fields.push(new FormControl(null));
    });

    if (!this.editing) {
      this.setFormValidators();

      // Pre-set the spawnable variable if the query param 'spawnable' is present
      if (this.route.snapshot.queryParamMap.get('spawnable') === 'true') {
        this.formGroup.patchValue({ spawnable: true });
      }
    }
  }

  canDeactivate() {
    return this.formGroup.pristine;
  }

  private setFormValidators() {
    if (this.preset.isXPEnabled) {
      this.formGroup.get('xp').setValidators([numberValidator, Validators.min(0), Validators.required]);
    }

    if (this.preset.isHealthEnabled) {
      this.formGroup.get('health.max').setValidators([numberValidator, Validators.min(1), Validators.required]);

      this.formGroup.get('health.current').setValidators([numberValidator, Validators.min(0), Validators.required]);
    }
  }

  private constructEntity(): IEntity {
    const v = this.formGroup.value;

    let hpTextLevels = null;

    if (this.preset.isHealthEnabled && this.preset.health.type === HealthType.TEXT_BASED) {
      hpTextLevels = {};

      this.hpTextLevels.controls.forEach((ctrl) => {
        hpTextLevels[ctrl.value.percent] = ctrl.value.text;
      });
    }

    const ent: IEntity = {
      id: this.entity ? this.entity.id : '',
      name: v.name,
      content: v.content,
      xp: v.xp,
      imageId: v.imageId,
      imageColor1: v.imageColor1,
      imageColor2: v.imageColor2,
      currency: v.currency,
      spawnable: v.spawnable,
      fields: this.fields.value
        .map((fv, idx) => {
          return {
            name: this.preset.fields[idx].name,
            value: fv,
          };
        })
        .filter((fv) => fv.value !== null && fv.value !== undefined && fv.value !== ''),
      health: {
        max: v.health.max,
        current: v.health.current,
        textDamageLevels: hpTextLevels,
      },
      userId: this.editing ? this.entity.userId : this.login.id,
      campaignId: this.campaignService.campaign.id,
      entityPresetId: this.preset.id,
      attributes: [],
    };

    if (!this.preset.isHealthEnabled) {
      ent.health = null;
    }

    for (const [k, attrData] of Object.entries(this.attributesFormGroup.value)) {
      const preset = this.preset.attributes.find((p) => p.name === k);

      ent.attributes.push({
        name: preset.name,
        data: attrData as string,
        type: preset.type,
      });
    }

    return ent;
  }

  private async loadEntity(id: string) {
    this.loading = true;
    this.entity = null;
    this.formGroup.disable();

    try {
      const ent = await this.entityService.getEntity(id);
      this.entity = ent;
      this.setFormValidators();
      if (this.entity.health && this.entity.health.textDamageLevels) {
        Object.keys(this.entity.health.textDamageLevels).forEach(() => {
          this.addHealthText();
        });
      }

      setTimeout(() => {
        const patchValue: any = { ...ent };

        patchValue.fields = this.preset.fields.map((f) => {
          const val = this.entity.fields.find((fld) => fld.name === f.name);

          if (val) {
            return val.value;
          } else {
            return null;
          }
        });

        if (patchValue.health && patchValue.health.textDamageLevels) {
          const healthLevels = Object.keys(patchValue.health.textDamageLevels).map((percent) => {
            return {
              percent: percent,
              text: patchValue.health.textDamageLevels[percent],
            };
          });

          patchValue.health.textDamageLevels = healthLevels;
        } else if (patchValue.health) {
          patchValue.health.textDamageLevels = [];
        }

        if (ent.health === null) {
          ent.health = { max: 1, current: 0 };
        }

        this.formGroup.patchValue(patchValue);

        for (const attr of ent.attributes) {
          if (this.attributesFormGroup.get(attr.name)) {
            this.attributesFormGroup.get(attr.name).setValue(attr.data);
          }
        }
      }, 1);
    } catch (err) {
      throw err;
    }

    this.formGroup.enable();
    this.loading = false;
  }

  public async save() {
    const entity = this.constructEntity();

    this.saving = true;
    this.formGroup.disable();
    this.attributesFormGroup.disable();

    if (this.editing) {
      try {
        await this.entityService.updateEntity(entity);

        this.formGroup.markAsPristine();

        this.cancel();
      } catch (err) {
        throw err;
      }
    } else {
      try {
        const ent = await this.entityService.createEntity(entity);

        this.formGroup.markAsPristine();

        this.router.navigate(['campaigns', this.campaignService.campaign.id, 'entities', ent.id]);
      } catch (err) {
        throw err;
      }
    }

    this.formGroup.enable();
    this.attributesFormGroup.enable();
    this.saving = false;
  }

  public async delete() {
    const { value } = await Swal.fire({
      title: 'Are you sure?',
      text: 'This cannot be undone!',
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true,
    });

    if (value === true) {
      try {
        await this.entityService.deleteEntity(this.entity.id);
        this.router.navigate(['campaigns', this.campaignService.campaign.id, 'overview']);
      } catch (err) {
        throw err;
      }
    }
  }

  public addHealthText() {
    this.hpTextLevels.push(
      new FormGroup({
        percent: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
        text: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
      })
    );
  }

  public removeHealthText(idx: number) {
    this.hpTextLevels.removeAt(idx);
  }

  public trackField(idx: number) {
    return idx;
  }

  public getFieldConfig(field: IEntityFieldConfig) {
    if (field.type === DynamicFieldType.CURRENCY) {
      field.options = {
        levels: this.campaignService.campaign.currencyMap,
        trackCoins: this.campaignService.campaign.trackCoins,
      };
    }

    return field;
  }

  public cancel() {
    this.location.back();
  }

  public get preset() {
    const epreset = this.campaignService.campaign.entityPresets.find(
      (ep) => ep.id === (this._entTypeId || this.route.snapshot.paramMap.get('ent_type_id'))
    );
    return epreset;
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get content() {
    return this.formGroup.get('content');
  }

  public get xp() {
    return this.formGroup.get('xp');
  }

  public get currency() {
    return this.formGroup.get('currency');
  }

  public get health() {
    return this.formGroup.get('health');
  }

  public get hpMax() {
    return this.formGroup.get('health.max');
  }

  public get hpCurrent() {
    return this.formGroup.get('health.current');
  }

  public get hpTextLevels() {
    return this.formGroup.get('health.textDamageLevels') as FormArray;
  }

  public get campaignEditable() {
    return this.campaignService.canEdit;
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }

  public get currencyConfig(): IDynamicFieldConfig {
    return {
      name: 'Money',
      type: DynamicFieldType.CURRENCY,
      options: {
        levels: this.campaignService.campaign.currencyMap,
        trackCoins: this.campaignService.campaign.trackCoins,
      },
    };
  }

  public get fields(): FormArray {
    return this.formGroup.get('fields') as FormArray;
  }
}
