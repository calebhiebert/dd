import { Component, OnInit } from '@angular/core';
import {
  IConcept,
  ConceptService,
  IConceptType,
  IField
} from 'src/app/concept.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-concept-view',
  templateUrl: './concept-view.component.html',
  styleUrls: ['./concept-view.component.css'],
})
export class ConceptViewComponent implements OnInit {
  public loading = false;
  public notFound = false;

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
        this.notFound = true;
      } else {
        this.load(id);
      }
    });
  }

  private getConceptType(id: string): IConceptType {
    return this.campaignService.campaign.conceptTypes.find(
      (ct) => ct.id === id
    );
  }

  private async load(id: string) {
    this.loading = true;

    try {
      this.concept = await this.conceptService.getConcept(id);
    } catch (err) {
      if (err.status && err.status === 404) {
        this.notFound = true;
      } else {
        throw err;
      }
    }

    this.loading = false;
  }

  public edit() {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'concepts',
      this.conceptType.id,
      this.concept.id,
      'edit',
    ]);
  }

  public getFieldConfig(field: IField) {
    return this.concept.fields.find(f => f.name === field.name);
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
