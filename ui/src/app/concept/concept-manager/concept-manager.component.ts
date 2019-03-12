import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptService, IConcept, IConceptType } from 'src/app/concept.service';
import { CampaignService } from 'src/app/campaign.service';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'dd-concept-manager',
  templateUrl: './concept-manager.component.html',
  styleUrls: ['./concept-manager.component.css'],
})
export class ConceptManagerComponent implements OnInit {
  public loading = false;
  public loadError: any;

  public conceptType: IConceptType;
  public concepts: IConcept[];
  public totalConcepts: number;
  public search: string = null;
  public page = 1;

  public searchControl: FormControl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conceptService: ConceptService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.searchControl = new FormControl(null);

    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(250)
      )
      .subscribe((search) => {
        if (search === null || search === undefined || search.trim().length === 0) {
          this.search = null;
        } else {
          this.search = search.trim();
        }

        if (this.conceptType) {
          this.page = 1;
          this.load(this.conceptType.id);
        }
      });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('ct_id');
      this.conceptType = this.getConceptType(id);
      this.concepts = null;

      const settings = this.readQueryFromURL();
      this.searchControl.setValue(settings.search);
      this.page = settings.offset / settings.limit + 1;
      this.search = settings.search;

      this.load(id);
    });
  }

  private getConceptType(id: string): IConceptType {
    return this.campaignService.campaign.conceptTypes.find((ct) => ct.id === id);
  }

  private writeQueryToURL() {
    const queryParams = {
      limit: 10,
      offset: (this.page - 1) * 10,
    };

    if (this.search) {
      queryParams['search'] = this.search;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      replaceUrl: true,
    });
  }

  private readQueryFromURL() {
    const queryParams = {
      limit: 10,
      offset: 0,
      search: undefined,
    };

    const params = this.route.snapshot.queryParamMap;

    try {
      if (params.has('limit')) {
        queryParams.limit = parseInt(params.get('limit'), 10);
      }

      if (params.has('offset')) {
        queryParams.offset = parseInt(params.get('offset'), 10);
      }

      if (params.has('search')) {
        queryParams.search = params.get('search');
      }
    } catch (err) {
      // Probalby from invalid stuff
    }

    return queryParams;
  }

  private async load(id: string) {
    if (!this.conceptType) {
      this.loadError = { status: 404 };
      return;
    }

    this.loadError = undefined;
    this.loading = true;

    try {
      const result = await this.conceptService.getConcepts(id, 10, (this.page - 1) * 10, this.search);
      this.concepts = result.concepts;
      this.totalConcepts = result.total;
      this.writeQueryToURL();
    } catch (err) {
      this.loadError = err;
    }

    this.loading = false;
  }

  public create() {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'concepts', this.conceptType.id, 'create']);
  }

  public createFromSearch() {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'concepts', this.conceptType.id, 'create'], {
      queryParams: {
        name: this.search,
      },
    });
  }

  public selectConcept(concept: IConcept) {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'concepts', this.conceptType.id, concept.id, 'view']);
  }

  public trackConcept(idx: number, concept: IConcept) {
    return concept.id;
  }

  public changePage(page: number) {
    this.page = page;
    this.load(this.conceptType.id);
  }

  public get editing() {
    return this.campaignService.canEdit || (this.conceptType && this.conceptType.playerEditable);
  }

  public get canCreateFromSearch() {
    return this.editing && this.search;
  }
}
