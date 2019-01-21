import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import {
  EntityService,
  IEntityPreset,
  HealthType,
} from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { numberValidator } from '../dynamic-attribute-form/dynamic-attribute-form.component';
import { LoginService } from 'src/app/login.service';
import {
  IEntityAttributePreset,
  EntityAttributePresetsService,
} from 'src/app/entity-attribute-presets.service';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'dd-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css'],
})
export class EntityFormComponent implements OnInit {
  public saving = false;
  public deleting = false;
  public loading = false;

  public formGroup: FormGroup;

  public entityPreset: IEntityPreset;

  public presetList: IEntityAttributePreset[];

  @ViewChild('presets')
  public presetsModal: ModalComponent<void>;

  @ViewChild('confirmmodal')
  public confirmModal: ConfirmationModalComponent;

  constructor(
    private entityService: EntityService,
    private campaignService: CampaignService,
    private presets: EntityAttributePresetsService,
    private login: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      health: new FormGroup({
        mode: new FormControl('0'),
        max: new FormControl(null, [Validators.min(0), numberValidator]),
      }),
      playerCreatable: new FormControl(false),
      spawnable: new FormControl(false),
      isInventoryEnabled: new FormControl(false),
      isCurrencyEnabled: new FormControl(false),
      isXPEnabled: new FormControl(false),
      isHealthEnabled: new FormControl(false),
      imageId: new FormControl(null, Validators.required),
      attributes: new FormArray([]),
    });

    this.route.params.subscribe((params) => {
      if (params.ent_id) {
        this.loadEntityPreset(params.ent_id);
      }
    });

    this.presets.getPresets().then((p) => (this.presetList = p));
  }

  private async loadEntityPreset(id: string) {
    this.loading = true;
    this.formGroup.disable();

    try {
      const preset = await this.entityService.getEntityPreset(id);
      this.entityPreset = preset;

      (this.formGroup.get(
        'attributes'
      ) as FormArray).controls = preset.attributes.map((attr) => {
        if (attr.options) {
          return new FormGroup({
            options: new FormArray(attr.options.map((o) => new FormControl(o))),
          });
        } else {
          return new FormGroup({});
        }
      });

      setTimeout(() => {
        this.formGroup.patchValue(preset);
      }, 1);
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.loading = false;
    this.formGroup.enable();
  }

  public usePreset(p: IEntityAttributePreset) {
    (this.formGroup.get('attributes') as FormArray).controls = p.attributes.map(
      (attr) => {
        return new FormGroup({});
      }
    );

    setTimeout(() => {
      this.formGroup.patchValue({ attributes: p.attributes });
      this.presetsModal.close(null);
    }, 1);
  }

  public submit() {}

  public removeAttribute(i: number) {
    (this.formGroup.get('attributes') as FormArray).removeAt(i);
  }

  public async save() {
    if (this.formGroup.valid) {
      this.formGroup.disable();
      this.saving = true;

      if (this.editing) {
        try {
          const v = this.formGroup.value;

          const updatedPreset: IEntityPreset = {
            id: this.entityPreset.id,
            userId: this.login.id,
            campaignId: this.campaignService.campaign.id,
            name: v.name,
            description: v.description,
            health: {
              type: HealthType.NORMAL,
              max: 100,
            },
            imageId: v.imageId,
            playerCreatable: v.playerCreatable,
            isCurrencyEnabled: v.isCurrencyEnabled,
            isInventoryEnabled: v.isInventoryEnabled,
            isXPEnabled: v.isXPEnabled,
            isHealthEnabled: v.isHealthEnabled,
            attributes: v.attributes,
          };

          await this.entityService.updateEntityPreset(updatedPreset);

          await this.router.navigate(['../../..', 'settings'], {
            relativeTo: this.route,
          });
        } catch (err) {
          console.log('SAVE ERR', err);
        }
      } else {
        const v = this.formGroup.value;

        const ep = await this.entityService.createEntityPreset({
          id: '',
          userId: this.login.id,
          campaignId: this.campaignService.campaign.id,
          name: v.name,
          description: v.description,
          health: {
            type: v.health.type,
            max: v.health.max || 100,
          },
          imageId: v.imageId,
          isCurrencyEnabled: v.isCurrencyEnabled,
          isInventoryEnabled: v.isInventoryEnabled,
          isXPEnabled: v.isXPEnabled,
          isHealthEnabled: v.isHealthEnabled,
          playerCreatable: v.playerCreatable,
          attributes: v.attributes,
        });

        this.campaignService.campaign.entityPresets
          ? this.campaignService.campaign.entityPresets.push(ep)
          : (this.campaignService.campaign.entityPresets = [ep]);

        await this.router.navigate(['../..', 'settings'], {
          relativeTo: this.route,
        });

        console.log('EF Create', ep);
      }

      this.saving = false;
      this.formGroup.enable();
    }
  }

  public async delete() {
    if (
      await this.confirmModal.getConfirmation(
        'Are you sure you want to delete this entity? This cannot be undone'
      )
    ) {
      this.deleting = true;
      this.formGroup.disable();
      try {
        await this.entityService.deleteEntityPreset(
          this.campaignService.campaign.id,
          '1'
        );
        this.router.navigate(['../../..', 'settings'], {
          relativeTo: this.route,
        });
      } catch (err) {
        console.log('DEL ERR', err);
      }
      this.formGroup.enable();
      this.deleting = false;
    }
  }

  public addAttribute() {
    (this.formGroup.get('attributes') as FormArray).push(new FormGroup({}));
  }

  public get attributeControls() {
    return (this.formGroup.get('attributes') as FormArray).controls;
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get description() {
    return this.formGroup.get('description');
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }
}