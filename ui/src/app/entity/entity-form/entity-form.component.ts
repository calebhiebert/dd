import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { EntityService, IEntityPreset } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { LoginService } from 'src/app/login.service';
import { IEntityAttributePreset, EntityAttributePresetsService } from 'src/app/entity-attribute-presets.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { EntityAttributeRowEditorComponent } from '../entity-attribute-row-editor/entity-attribute-row-editor.component';
import { AttributeType } from 'src/app/attributes';
import { ComponentCanDeactivate } from 'src/app/unsaved-changes.guard';
import { FieldDefinitionFormComponent } from 'src/app/dynform/field-definition-form/field-definition-form.component';

@Component({
  selector: 'dd-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css'],
})
export class EntityFormComponent implements OnInit, ComponentCanDeactivate {
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

  @ViewChildren('atteditor')
  public attributeEditors: QueryList<EntityAttributeRowEditorComponent>;

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
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      health: new FormGroup({
        type: new FormControl('0'),
        colorType: new FormControl('0'),
        staticColor: new FormControl(null),
        amountHidden: new FormControl(false),
      }),
      playerCreatable: new FormControl(false),
      spawnable: new FormControl(false),
      isCurrencyEnabled: new FormControl(false),
      isXPEnabled: new FormControl(false),
      isHealthEnabled: new FormControl(false),
      conceptTypesEnabled: new FormControl([]),
      imageId: new FormControl(null, Validators.required),
      attributes: new FormArray([]),
      fields: new FormArray([]),
    });

    this.route.params.subscribe((params) => {
      if (params.ent_id) {
        this.loadEntityPreset(params.ent_id);
      }
    });

    this.presets.getPresets().then((p) => (this.presetList = p));
  }

  canDeactivate() {
    return !this.formGroup.dirty;
  }

  private async loadEntityPreset(id: string) {
    this.loading = true;
    this.formGroup.disable();

    try {
      const preset = await this.entityService.getEntityPreset(id);
      this.entityPreset = preset;

      (this.formGroup.get('attributes') as FormArray).controls = preset.attributes.map((attr) => {
        if (attr.options) {
          return new FormGroup({
            options: new FormArray(attr.options.map((o) => new FormControl(o))),
          });
        } else {
          return new FormGroup({});
        }
      });

      setTimeout(() => {
        preset.fields.forEach((f) => {
          const formGroup = FieldDefinitionFormComponent.createFormGroup(f);
          formGroup.addControl('class', new FormControl(0));
          this.fields.push(formGroup);
        });
        this.formGroup.patchValue({ ...preset, fields: preset.fields || [] }, { emitEvent: false });
      }, 1);
    } catch (err) {
      throw err;
    }

    this.loading = false;
    this.formGroup.enable();
  }

  private constructEntityPreset(): IEntityPreset {
    const v = this.formGroup.value;

    if (!v.health) {
      v.health = {};
    }

    const entityPreset: IEntityPreset = {
      userId: this.login.id,
      campaignId: this.campaignService.campaign.id,
      name: v.name,
      description: v.description,
      health: {
        type: v.health.type,
        colorType: v.health.colorType,
        staticColor: v.health.staticColor,
        amountHidden: v.health.amountHidden,
      },
      fields: v.fields,
      imageId: v.imageId,
      isCurrencyEnabled: v.isCurrencyEnabled,
      isXPEnabled: v.isXPEnabled,
      isHealthEnabled: v.isHealthEnabled,
      conceptTypesEnabled: v.conceptTypesEnabled,
      playerCreatable: v.playerCreatable,
      attributes: v.attributes,
    };

    if (this.editing) {
      entityPreset.id = this.entityPreset.id;
      entityPreset.userId = this.entityPreset.userId;
      entityPreset.campaignId = this.entityPreset.campaignId;
    }

    return entityPreset;
  }

  public usePreset(p: IEntityAttributePreset) {
    (this.formGroup.get('attributes') as FormArray).controls = p.attributes.map((attr) => {
      if (attr.type === AttributeType.ENUM) {
        return new FormGroup({
          options: new FormArray(attr.options.map((o) => new FormControl(o))),
        });
      } else {
        return new FormGroup({});
      }
    });

    setTimeout(() => {
      this.formGroup.patchValue({ attributes: p.attributes });
      this.presetsModal.close(null);
    }, 1);
  }

  public removeAttribute(i: number) {
    (this.formGroup.get('attributes') as FormArray).removeAt(i);
  }

  public async save() {
    if (this.formGroup.invalid) {
      return;
    }

    const preset = this.constructEntityPreset();

    this.formGroup.disable();
    this.saving = true;

    try {
      if (this.editing) {
        await this.entityService.updateEntityPreset(preset);
      } else {
        await this.entityService.createEntityPreset(preset);
      }

      await this.router.navigate(['campaigns', this.campaignService.campaign.id, 'settings']);
    } catch (err) {
      throw err;
    }

    this.formGroup.enable();
    this.formGroup.markAsPristine();
    this.saving = false;
  }

  public async delete() {
    if (await this.confirmModal.getConfirmation('Are you sure you want to delete this entity? This cannot be undone')) {
      this.deleting = true;
      this.formGroup.disable();
      try {
        await this.entityService.deleteEntityPreset(this.campaignService.campaign.id, '1');
        await this.router.navigate(['campaigns', this.campaignService.campaign.id, 'settings']);
      } catch (err) {
        throw err;
      }
      this.formGroup.enable();
      this.deleting = false;
    }
  }

  public addAttribute() {
    (this.formGroup.get('attributes') as FormArray).push(new FormGroup({}));

    // Wait for the dom to be updated
    setTimeout(() => {
      this.attributeEditors.last.collapsed = false;

      // Wait for the dom to update again
      setTimeout(() => {
        // Scroll to the bottom of the page, where the attribute is
        document.getElementById('app-content').scrollTo(0, document.getElementById('app-content').scrollHeight);
      }, 1);
    }, 1);
  }

  public addField() {
    this.fields.push(FieldDefinitionFormComponent.createFormGroup(null));
  }

  public backToTop() {
    document.getElementById('app-content').scrollTo(0, 0);
  }

  public trackField(idx: number) {
    return idx;
  }

  public removeField(idx: number) {
    this.fields.removeAt(idx);
    this.formGroup.markAsDirty();
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

  public get isHealthEnabled() {
    return this.formGroup.get('isHealthEnabled');
  }

  public get hpColorType() {
    return this.formGroup.get('health.colorType');
  }

  public get hpType() {
    return this.formGroup.get('health.type');
  }

  public get conceptTypeList() {
    return this.campaignService.campaign.conceptTypes.filter((ct) => ct.entityConfig.enabled === true);
  }

  public get fields() {
    return this.formGroup.get('fields') as FormArray;
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }
}
