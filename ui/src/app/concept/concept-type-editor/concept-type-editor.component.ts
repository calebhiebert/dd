import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {
  IDynamicFieldConfig,
  DynamicFieldType,
} from 'src/app/dynform/form-types';
import { ComponentCanDeactivate } from 'src/app/unsaved-changes.guard';
import { IConceptType, ConceptService } from 'src/app/concept.service';
import { Location } from '@angular/common';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'dd-concept-type-editor',
  templateUrl: './concept-type-editor.component.html',
  styleUrls: ['./concept-type-editor.component.css'],
})
export class ConceptTypeEditorComponent
  implements OnInit, ComponentCanDeactivate {
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
    private location: Location
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null),
      icon: new FormControl(null),
      fields: new FormArray([]),
    });

    if (this.editing) {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('ct_id');
        this.load(id);
      });
    }
  }

  private constructConceptType(): IConceptType {
    const conceptType: IConceptType = {
      name: this.name.value,
      description: this.description.value,
      userId: this.login.id,
      icon: this.icon.value,
      campaignId: this.campaignService.campaign.id,
      fields: [],
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
      this.formGroup.patchValue(this.conceptType);
    } catch (err) {
      throw err;
    }

    this.formGroup.enable();
    this.loading = false;
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
        await this.conceptService
          .createConceptType(conceptType)
          .then(console.log);
      }
    } catch (err) {
      throw err;
    }

    this.formGroup.markAsPristine();
    this.saving = false;
  }

  public cancel() {
    this.location.back();
  }

  public async delete() {}

  public get editing() {
    return this.route.snapshot.data.editing;
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get description() {
    return this.formGroup.get('description');
  }

  public get icon() {
    return this.formGroup.get('icon');
  }
}
