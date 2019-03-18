import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IConceptType, ConceptService, IConcept } from 'src/app/concept.service';
import { ArticleService, IArticleConcept, IArticle } from 'src/app/article.service';
import { SearchFunction, DropdownItemGenerationFunction } from 'src/app/autocomplete/autocomplete.component';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { UpdateHubService, ConnectionState } from 'src/app/update-hub.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'dd-article-concept-manager',
  templateUrl: './article-concept-manager.component.html',
  styleUrls: ['./article-concept-manager.component.css'],
})
export class ArticleConceptManagerComponent implements OnInit, OnDestroy {
  @Input()
  public conceptType: IConceptType;

  @Input()
  public article: IArticle;

  @Input()
  public articleConcepts: IArticleConcept[];

  @Input()
  public viewOnly = true;

  public loading = false;
  public doConceptSearch: SearchFunction;
  public onConceptSelected: DropdownItemGenerationFunction;

  private _conceptArticleUpdateSubscription: Subscription;
  private _conceptArticleDeleteSubscription: Subscription;

  constructor(
    private articleService: ArticleService,
    private conceptService: ConceptService,
    private router: Router,
    private campaignService: CampaignService,
    private update: UpdateHubService
  ) {}

  ngOnInit() {
    // This will be called by the autocomplete module
    this.doConceptSearch = (search: string) => {
      return this.searchConcepts(search);
    };

    this._conceptArticleDeleteSubscription = this.update.conceptArticleDelete.subscribe((ca: IArticleConcept) => {
      if (this.articleConcepts) {
        this.articleConcepts = this.articleConcepts.filter((ac) => {
          const match = ac.articleId === ca.articleId && ac.conceptId === ca.conceptId;
          return !match;
        });
      }
    });

    this._conceptArticleUpdateSubscription = this.update.conceptArticleUpdate
      .pipe(
        filter((cau) => {
          return cau.articleId === this.article.id && cau.concept.conceptTypeId === this.conceptType.id;
        })
      )
      .subscribe((ca: IArticleConcept) => {
        if (this.articleConcepts) {
          const existing = this.articleConcepts.find((eac) => eac.conceptId === ca.conceptId && eac.articleId === ca.articleId);

          if (existing !== undefined) {
            Object.assign(existing, ca);
          } else {
            this.articleConcepts.push(ca);
          }
        }
      });

    this.load(this.conceptType.id);
  }

  ngOnDestroy() {
    if (this._conceptArticleDeleteSubscription) {
      this._conceptArticleDeleteSubscription.unsubscribe();
    }

    if (this._conceptArticleUpdateSubscription) {
      this._conceptArticleUpdateSubscription.unsubscribe();
    }
  }

  private async load(conceptTypeId: string) {
    this.loading = true;

    try {
      this.articleConcepts = await this.articleService.getArticleConcepts(this.article.id, conceptTypeId);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  private async createNewConcept(name: string) {
    return this.conceptService.createConcept({
      name: name,
      userId: 'fake',
      fields: [],
      tags: ['TODO'],
      isContainer: false,
      conceptTypeId: this.conceptType.id,
    });
  }

  public async searchConcepts(search: string): Promise<any[]> {
    const concepts = await this.conceptService.getConcepts(this.conceptType.id, 5, 0, search);

    const mappedConcepts: any[] = concepts.concepts.map((c) => {
      return { ...c, value: c.name };
    });

    if (search.trim().length > 0) {
      mappedConcepts.push({
        value: search,
        id: 'create-new-concept',
      });
    }

    return mappedConcepts;
  }

  public createAutocompleteItem(item: any) {
    if (item.id === 'create-new-concept') {
      return `<span><i class="icon icon-plus"></i> ${item.value}</span>`;
    } else {
      return item.name;
    }
  }

  public async remove(articleConcept: IArticleConcept) {
    this.articleConcepts = this.articleConcepts.filter((aq) => aq !== articleConcept);
    await this.articleService.deleteArticleConcept(articleConcept);
  }

  public async conceptSelected(concept: IConcept | any) {
    if (concept.id === 'create-new-concept') {
      const createdConcept = await this.createNewConcept(concept.value);
      await this.conceptSelected(createdConcept);
    } else {
      const existingArticleConcept = this.articleConcepts.find((ac) => ac.conceptId === concept.id);

      if (existingArticleConcept !== undefined) {
        return;
      }

      this.articleConcepts.push({
        articleId: this.article.id,
        conceptId: concept.id,
        concept: concept,
        isPurchasable: false,
        trackOnEntity: true,
      });

      await this.articleService.updateArticleConcept({
        articleId: this.article.id,
        conceptId: concept.id,
        isPurchasable: false,
        trackOnEntity: true,
      });
    }
  }

  public trackArticleConcept(idx: number, articleConcept: IArticleConcept) {
    return articleConcept.conceptId + articleConcept.articleId;
  }

  public get editable() {
    return this.campaignService.canEdit && !this.viewOnly;
  }
}
