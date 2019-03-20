import { Component, OnInit, OnDestroy } from '@angular/core';
import { IArticle, ArticleService } from 'src/app/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { Subscription } from 'rxjs';
import { UpdateHubService, ConnectionState } from 'src/app/update-hub.service';
import { filter } from 'rxjs/operators';
import { IConceptType } from 'src/app/concept.service';
import { NoteService, NoteType } from 'src/app/note.service';

@Component({
  selector: 'dd-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css'],
})
export class ArticleViewComponent implements OnInit, OnDestroy {
  public loading = false;
  public loadError: any;
  public article: IArticle;
  public questsExpanded = false;
  public notesExpanded = false;
  public conceptTypesExpanded = {};

  private _updateSubscription: Subscription;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,
    private updateHub: UpdateHubService,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('a_id')) {
        if (this.article) {
          this.updateHub.unsubscribeArticles([this.article.id]);
        }

        this.updateHub.subscribeArticles([params.get('a_id')]);
        this.article = undefined;
        this.load(params.get('a_id'));
      }
    });

    this._updateSubscription = this.updateHub.articleUpdated
      .pipe(filter((article) => article.id === this.article.id))
      .subscribe((article) => {
        this.article = article;
      });

    this.updateHub.stateUpdate.pipe(filter((s) => s === ConnectionState.CONNECTED)).subscribe(() => {
      this.updateHub.subscribeArticles([this.route.snapshot.paramMap.get('a_id')]);
    });
  }

  ngOnDestroy() {
    if (this._updateSubscription) {
      this._updateSubscription.unsubscribe();
    }
  }

  private async load(id: string) {
    this.loading = true;

    try {
      this.article = await this.articleService.getArticle(id);

      this.noteService.getNotes(this.campaignService.campaign.id, {
        articleId: this.article.id,
      });
    } catch (err) {
      this.loadError = err;
      console.log(err);
    }

    this.loading = false;
  }

  public edit() {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'articles', this.article.id, 'edit']);
  }

  public viewOnMap() {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'maps', this.article.mapId], {
      queryParams: {
        lat: this.article.lat,
        lng: this.article.lng,
      },
    });
  }

  public addNote() {
    this.noteService.addNote({
      type: NoteType.ARTICLE,
      articleId: this.article.id,
    });
  }

  public get editable() {
    return this.campaignService.canEdit;
  }

  public get conceptTypes(): IConceptType[] {
    if (this.article) {
      const conceptTypes = {};

      this.article.articleConcepts.forEach((ac) => {
        if (!conceptTypes[ac.concept.conceptTypeId]) {
          conceptTypes[ac.concept.conceptTypeId] = this.campaignService.campaign.conceptTypes.find(
            (ct) => ct.id === ac.concept.conceptTypeId
          );
        }
      });

      return Object.values(conceptTypes);
    } else {
      return [];
    }
  }

  public get notes() {
    if (this.article) {
      return this.noteService.getArticleNotes(this.article.id);
    } else {
      return [];
    }
  }
}
