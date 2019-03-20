import { Component, OnInit } from '@angular/core';
import { IConcept, ConceptService, IConceptType, IField, IConceptField } from 'src/app/concept.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { DynamicFieldType } from 'src/app/custom-controls/dynform/form-types';

@Component({
  selector: 'dd-concept-view',
  templateUrl: './concept-view.component.html',
  styleUrls: ['./concept-view.component.css'],
})
export class ConceptViewComponent implements OnInit {
  public loading = false;
  public loadError: any;

  public conceptType: IConceptType;
  public concept: IConcept;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,
    private conceptService: ConceptService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('c_id');
      const typeId = params.get('ct_id');

      this.conceptType = this.getConceptType(typeId);
      if (this.conceptType === undefined || this.conceptType === null) {
        this.loadError = { status: 404 };
      } else {
        this.load(id);
      }
    });
  }

  private getConceptType(id: string): IConceptType {
    return this.campaignService.campaign.conceptTypes.find((ct) => ct.id === id);
  }

  private async load(id: string) {
    this.loading = true;

    try {
      this.concept = await this.conceptService.getConcept(id);
    } catch (err) {
      this.loadError = err;
    }

    this.loading = false;
  }

  public edit() {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'concepts', this.conceptType.id, this.concept.id, 'edit']);
  }

  public history() {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'concepts', this.conceptType.id, this.concept.id, 'history']);
  }

  public getFieldConfig(field: IField) {
    return this.conceptType.fields.find((f) => f.name === field.name);
  }

  public trackField(idx: number) {
    return idx;
  }

  public get tableFields() {
    const tableFields: { field: IField; config: IConceptField }[] = [];

    for (const field of this.concept.fields) {
      const config = this.getFieldConfig(field);

      if (
        [
          DynamicFieldType.BOOLEAN,
          DynamicFieldType.ENUM,
          DynamicFieldType.ENUM_MULTI,
          DynamicFieldType.FLOAT,
          DynamicFieldType.INT,
          DynamicFieldType.STRING,
          DynamicFieldType.CURRENCY,
        ].indexOf(config.type) !== -1
      ) {
        tableFields.push({ field: field, config: config });
      }
    }

    return tableFields;
  }

  public get formattedTextFields() {
    const formattedTextFields: IField[] = [];

    for (const field of this.concept.fields) {
      const config = this.getFieldConfig(field);

      if (config.type === DynamicFieldType.TEXT_FORMATTED) {
        formattedTextFields.push(field);
      }
    }

    return formattedTextFields;
  }

  public get editable() {
    return this.campaignService.canEdit || (this.conceptType && this.conceptType.playerEditable);
  }

  public get user() {
    if (this.concept) {
      const member = this.campaignService.campaign.members.find((m) => m.userId === this.concept.userId);

      if (member) {
        return member.user;
      }
    }

    return null;
  }
}
