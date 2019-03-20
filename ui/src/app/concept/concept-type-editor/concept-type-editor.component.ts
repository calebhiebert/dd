import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ComponentCanDeactivate } from 'src/app/unsaved-changes.guard';
import { IConceptType, ConceptService } from 'src/app/concept.service';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/login.service';
import { IDynamicFieldConfig, DynamicFieldType } from 'src/app/custom-controls/dynform/form-types';
import { FieldDefinitionFormComponent } from 'src/app/custom-controls/dynform/field-definition-form/field-definition-form.component';

@Component({
  selector: 'dd-concept-type-editor',
  templateUrl: './concept-type-editor.component.html',
  styleUrls: ['./concept-type-editor.component.css'],
})
export class ConceptTypeEditorComponent implements OnInit, ComponentCanDeactivate {
  public saving = false;
  public deleting = false;
  public loading = false;
  public conceptType: IConceptType;

  public formGroup: FormGroup;

  public nameFieldConfig: IDynamicFieldConfig = {
    name: 'Name',
    description: 'The name of this concept',
    type: DynamicFieldType.STRING,
    options: {
      maxLength: 30,
      required: true,
    },
  };

  public pluralFormFieldConfig: IDynamicFieldConfig = {
    name: 'Plural Form',
    description: 'This will be used in various places, the plural form',
    type: DynamicFieldType.STRING,
    options: {
      maxLength: 32,
      required: true,
    },
  };

  public descriptionFieldConfig: IDynamicFieldConfig = {
    name: 'Description',
    type: DynamicFieldType.STRING,
    options: {
      maxLength: 100,
      required: false,
    },
  };

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private conceptService: ConceptService,
    private login: LoginService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      pluralForm: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      icon: new FormControl(null),
      fields: new FormArray([]),
      playerEditable: new FormControl(false),
      entityConfig: new FormGroup({
        enabled: new FormControl(false),
        enableQuantity: new FormControl(false),
        fields: new FormArray([]),
      }),
    });

    if (this.editing) {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('ct_id');
        this.load(id);
      });
    }

    this.name.valueChanges.subscribe();
  }

  private constructConceptType(): IConceptType {
    const conceptType: IConceptType = {
      name: this.name.value,
      pluralForm: this.pluarlForm.value,
      description: this.description.value,
      userId: this.login.id,
      icon: this.icon.value,
      playerEditable: this.playerEditable.value,
      campaignId: this.campaignService.campaign.id,
      fields: this.fields.value || [],
      entityConfig: this.entityConfig.value,
    };

    if (this.editing) {
      conceptType.id = this.conceptType.id;
      conceptType.userId = this.conceptType.userId;
    }

    return conceptType;
  }

  private async load(id: string) {
    this.loading = true;
    this.formGroup.disable();

    try {
      this.conceptType = await this.conceptService.getConceptType(id);

      this.conceptType.fields.forEach((f) => this.fields.push(FieldDefinitionFormComponent.createFormGroup(f)));

      this.formGroup.patchValue(this.conceptType, { emitEvent: false });
    } catch (err) {
      throw err;
    }

    this.formGroup.enable({ emitEvent: false });
    this.loading = false;
  }

  public addField() {
    this.fields.push(FieldDefinitionFormComponent.createFormGroup(null));
  }

  public removeField(idx: number) {
    this.fields.removeAt(idx);
    this.formGroup.markAsDirty();
  }

  public canDeactivate() {
    return !this.formGroup.dirty;
  }

  public async save() {
    this.saving = true;

    try {
      const conceptType = this.constructConceptType();

      if (this.editing) {
        await this.conceptService.updateConceptType(conceptType);
      } else {
        await this.conceptService.createConceptType(conceptType);
      }

      this.formGroup.markAsPristine();
    } catch (err) {
      throw err;
    }

    this.formGroup.markAsPristine();
    this.saving = false;

    await this.router.navigate(['campaigns', this.campaignService.campaign.id, 'settings'], {
      queryParams: {
        refresh: true,
      },
    });
  }

  public trackField(idx: number) {
    return idx;
  }

  public cancel() {
    this.location.back();
  }

  public async delete() {
    this.deleting = true;

    try {
      await this.conceptService.deleteConceptType(this.conceptType.id);
    } catch (err) {
      throw err;
    }

    this.formGroup.markAsPristine();
    this.cancel();

    this.deleting = false;
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get description() {
    return this.formGroup.get('description');
  }

  public get pluarlForm() {
    return this.formGroup.get('pluralForm');
  }

  public get icon() {
    return this.formGroup.get('icon');
  }

  public get playerEditable() {
    return this.formGroup.get('playerEditable');
  }

  public get entityConfig() {
    return this.formGroup.get('entityConfig');
  }

  public get fields() {
    return this.formGroup.get('fields') as FormArray;
  }
}
