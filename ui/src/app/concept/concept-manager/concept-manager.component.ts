import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConceptService,
  IConcept,
  IConceptType,
} from 'src/app/concept.service';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-concept-manager',
  templateUrl: './concept-manager.component.html',
  styleUrls: ['./concept-manager.component.css'],
})
export class ConceptManagerComponent implements OnInit {
  public loading = false;
  public notFound = false;

  public conceptType: IConceptType;
  public concepts: IConcept[];
  public totalConcepts: number;
  public search: string;
  public page = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conceptService: ConceptService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('ct_id');
      this.load(id);
    });
  }

  private getConceptType(id: string): IConceptType {
    return this.campaignService.campaign.conceptTypes.find(
      (ct) => ct.id === id
    );
  }

  private async load(id: string) {
    this.conceptType = this.getConceptType(id);
    if (!this.conceptType) {
      this.notFound = true;
      return;
    }

    this.notFound = false;
    this.loading = true;

    try {
      const result = await this.conceptService.getConcepts(
        id,
        10,
        (this.page - 1) * 10
      );
      this.concepts = result.concepts;
      this.totalConcepts = result.total;
    } catch (err) {
      console.log('ERR', err);
      this.notFound = true;
    }

    this.loading = false;
  }

  public create() {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'concepts',
      this.conceptType.id,
      'create',
    ]);
  }

  public selectConcept(concept: IConcept) {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'concepts',
      this.conceptType.id,
      concept.id,
      'view',
    ]);
  }

  public changePage(page: number) {
    this.page = page;
    this.load(this.conceptType.id);
  }

  public get editing() {
    return this.campaignService.canEdit;
  }
}
