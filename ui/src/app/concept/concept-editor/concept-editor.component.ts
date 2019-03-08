import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConceptService,
  IConceptType,
  IConcept,
} from 'src/app/concept.service';
import { CampaignService } from 'src/app/campaign.service';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import {
  IDynamicFieldConfig,
  DynamicFieldType,
} from 'src/app/dynform/form-types';

@Component({
  selector: 'dd-concept-editor',
  templateUrl: './concept-editor.component.html',
  styleUrls: ['./concept-editor.component.css'],
})
export class ConceptEditorComponent implements OnInit {
  public notFound: boolean;
  public loading = false;
  public saving = false;

  public formGroup: FormGroup;
  public conceptType: IConceptType;

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
    type: DynamicFieldType.TEXT_FORMATTED,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conceptService: ConceptService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      imageId: new FormControl(null),
      content: new FormControl(null),
      fields: new FormArray([]),
      tags: new FormArray([]),
    });

    this.route.paramMap.subscribe((params) => {
      const typeId = params.get('ct_id');
      const id = params.get('c_id');

      this.conceptType = this.getConceptType(typeId);

      if (this.conceptType === null || this.conceptType === undefined) {
        this.notFound = true;
      } else {
        this.fields.controls = this.conceptType.fields.map(
          () => new FormControl(null)
        );
      }
    });
  }

  private getConceptType(id: string): IConceptType {
    return this.campaignService.campaign.conceptTypes.find(
      (ct) => ct.id === id
    );
  }

  private constructConcept(): IConcept {
    const concept: IConcept = {
      name: this.name.value,
      content: this.description.value,
      userId: 'dmmy',
      fields: this.fields.value,
      tags: this.tags.value,
      conceptTypeId: this.conceptType.id,
    };

    return concept;
  }

  public cancel() {}

  public delete() {}

  public async save() {
    if (!this.formGroup.valid) {
      return;
    }

    this.saving = true;
    try {
      const concept = this.constructConcept();

      if (this.editing) {
        await this.conceptService.updateConcept(concept);
      } else {
        await this.conceptService.createConcept(concept);
      }

      this.formGroup.markAsPristine();

      this.router.navigate([
        'campaigns',
        this.campaignService.campaign.id,
        'concepts',
        this.conceptType.id,
        'manage',
      ]);
    } catch (err) {
      throw err;
    }
    this.saving = false;
  }

  public trackField(idx: number) {
    return idx;
  }

  public getFieldControl(name: string) {}

  public get editing() {
    return this.route.snapshot.data.editing;
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get description() {
    return this.formGroup.get('content');
  }

  public get imageId() {
    return this.formGroup.get('imageId');
  }

  public get fields(): FormArray {
    return this.formGroup.get('fields') as FormArray;
  }

  public get tags(): FormArray {
    return this.formGroup.get('tags') as FormArray;
  }
}
