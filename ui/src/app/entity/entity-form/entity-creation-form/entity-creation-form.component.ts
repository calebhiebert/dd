import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntityService, IEntity, HealthType } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { numberValidator } from '../../dynamic-attribute-form/dynamic-attribute-form.component';
import { LoginService } from 'src/app/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'dd-entity-creation-form',
  templateUrl: './entity-creation-form.component.html',
  styleUrls: ['./entity-creation-form.component.css']
})
export class EntityCreationFormComponent implements OnInit {
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
    this.formGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      spawnable: new FormControl(false),
      xp: new FormControl(0, [numberValidator, Validators.min(0)]),
      currency: new FormControl(null, [numberValidator, Validators.min(0)]),
      health: new FormGroup({
        max: new FormControl(null, [numberValidator, Validators.min(1)]),
        current: new FormControl(null, [numberValidator, Validators.min(0)])
      }),
      imageId: new FormControl('uncertainty')
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('ent_id');
      this._entTypeId = params.get('ent_type_id');

      if (this.editing) {
        this.loadEntity(id);
      }
    });

    this.attributesFormGroup = new FormGroup({});

    if (!this.editing) {
      this.setFormValidators();

      // Pre-set the spawnable variable if the query param 'spawnable' is present
      if (this.route.snapshot.queryParamMap.get('spawnable') === 'true') {
        this.formGroup.patchValue({ spawnable: true });
      }
    }
  }

  private setFormValidators() {
    if (this.preset.isXPEnabled) {
      this.formGroup
        .get('xp')
        .setValidators([
          numberValidator,
          Validators.min(0),
          Validators.required
        ]);
    }

    if (this.preset.isCurrencyEnabled) {
      this.formGroup
        .get('currency')
        .setValidators([
          numberValidator,
          Validators.min(0),
          Validators.required
        ]);
    }

    if (this.preset.isHealthEnabled) {
      this.formGroup
        .get('health.max')
        .setValidators([
          numberValidator,
          Validators.min(1),
          Validators.required
        ]);

      this.formGroup
        .get('health.current')
        .setValidators([
          numberValidator,
          Validators.min(0),
          Validators.required
        ]);
    }
  }

  private constructEntity(): IEntity {
    const v = this.formGroup.value;

    const ent: IEntity = {
      id: this.entity ? this.entity.id : '',
      name: v.name,
      description: v.description,
      xp: v.xp,
      imageId: v.imageId,
      currency: v.currency,
      spawnable: v.spawnable,
      health: {
        max: v.health.max,
        current: v.health.current
      },
      userId: this.editing ? this.entity.userId : this.login.id,
      campaignId: this.campaignService.campaign.id,
      entityPresetId: this.preset.id,
      attributes: []
    };

    if (!this.preset.isHealthEnabled) {
      ent.health = null;
    }

    for (const [k, attrData] of Object.entries(
      this.attributesFormGroup.value
    )) {
      const preset = this.preset.attributes.find(p => p.name === k);

      ent.attributes.push({
        name: preset.name,
        data: attrData as string,
        type: preset.type
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

      setTimeout(() => {
        const patchValue = { ...ent };

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
      console.log('LOAD ERR', err);
    }

    this.formGroup.enable();
    this.loading = false;
  }

  public async save() {
    this.saving = true;
    this.formGroup.disable();
    this.attributesFormGroup.disable();

    if (this.editing) {
      try {
        await this.entityService.updateEntity(this.constructEntity());
        this.router.navigate(['../'], { relativeTo: this.route });
      } catch (err) {
        console.log('SAVE ERR', err);
      }
    } else {
      try {
        const ent = await this.entityService.createEntity(
          this.constructEntity()
        );

        this.router.navigate([
          'campaigns',
          this.campaignService.campaign.id,
          'entities',
          ent.id
        ]);
      } catch (err) {
        console.log('Create ERR', err);
      }
    }

    this.formGroup.enable();
    this.attributesFormGroup.enable();
    this.saving = false;
  }

  public cancel() {
    this.location.back();
  }

  public get preset() {
    if (this.editing) {
      return this.entity.preset;
    } else {
      const epreset = this.campaignService.campaign.entityPresets.find(
        ep => ep.id === this._entTypeId
      );

      return epreset;
    }
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get description() {
    return this.formGroup.get('description');
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

  public get campaignEditable() {
    return this.campaignService.canEdit;
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }
}
