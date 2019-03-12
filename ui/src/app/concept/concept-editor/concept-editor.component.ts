import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptService, IConceptType, IConcept, IConceptField } from 'src/app/concept.service';
import { CampaignService } from 'src/app/campaign.service';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { IDynamicFieldConfig, DynamicFieldType } from 'src/app/dynform/form-types';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'dd-concept-editor',
  templateUrl: './concept-editor.component.html',
  styleUrls: ['./concept-editor.component.css'],
})
export class ConceptEditorComponent implements OnInit {
  public error: any;
  public loading = false;
  public saving = false;
  public deleting = true;

  public formGroup: FormGroup;
  public conceptType: IConceptType;
  public concept: IConcept;

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
    private campaignService: CampaignService,
    private location: Location
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      imageId: new FormControl(null),
      content: new FormControl(null),
      fields: new FormArray([]),
      tags: new FormArray([]),
    });

    if (!this.editing && this.route.snapshot.queryParamMap.has('name')) {
      this.name.setValue(this.route.snapshot.queryParamMap.get('name'));
      this.name.markAsDirty();
    }

    this.route.paramMap.subscribe((params) => {
      const typeId = params.get('ct_id');
      const id = params.get('c_id');

      this.conceptType = this.getConceptType(typeId);

      if (this.conceptType === null || this.conceptType === undefined) {
        this.error = { status: 404 };
      } else {
        this.conceptType.fields.forEach(() => {
          this.fields.push(new FormControl(null));
        });

        if (this.editing) {
          this.load(id);
        }
      }
    });
  }

  private getConceptType(id: string): IConceptType {
    return this.campaignService.campaign.conceptTypes.find((ct) => ct.id === id);
  }

  private constructConcept(): IConcept {
    const concept: IConcept = {
      name: this.name.value,
      content: this.description.value,
      userId: 'dmmy',
      fields: this.fields.value
        .map((fv, idx) => {
          return {
            name: this.conceptType.fields[idx].name,
            value: fv,
          };
        })
        .filter((fv) => fv.value !== null && fv.value !== undefined && fv.value !== ''),
      tags: this.tags.value,
      imageId: this.imageId.value,
      conceptTypeId: this.conceptType.id,
    };

    if (this.editing) {
      concept.id = this.concept.id;
    }

    return concept;
  }

  private async load(id: string) {
    this.loading = true;
    this.formGroup.disable();

    try {
      this.concept = await this.conceptService.getConcept(id);
    } catch (err) {
      throw err;
    }

    this.formGroup.patchValue(
      {
        ...this.concept,
        fields: this.conceptType.fields.map((f) => {
          const val = this.concept.fields.find((fld) => fld.name === f.name);

          if (val) {
            return val.value;
          } else {
            return null;
          }
        }),
      },
      { emitEvent: false }
    );

    this.formGroup.setControl('tags', new FormArray(this.concept.tags.map((t) => new FormControl(t))));
    this.formGroup.enable();
    this.loading = false;
    this.formGroup.markAsPristine();
  }

  public cancel() {
    this.location.back();
  }

  public async delete() {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to undo this',
      showCancelButton: true,
    });

    if (!confirmation.value) {
      return;
    }

    this.formGroup.markAsPristine();
    this.formGroup.disable();
    this.deleting = true;

    try {
      await this.conceptService.deleteConcept(this.concept.id);
    } catch (err) {
      throw err;
    }

    this.cancel();
  }

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

      this.cancel();
    } catch (err) {
      throw err;
    }
    this.saving = false;
  }

  public trackField(idx: number) {
    return idx;
  }

  public getFieldConfig(field: IConceptField) {
    if (field.type === DynamicFieldType.CURRENCY) {
      field.options = {
        levels: this.campaignService.campaign.currencyMap,
        trackCoins: this.campaignService.campaign.trackCoins,
      };
    }

    return field;
  }

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
