import { Component, OnInit, OnDestroy } from '@angular/core';
import { IArticle, ArticleService } from 'src/app/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { Subscription } from 'rxjs';
import { UpdateHubService } from 'src/app/update-hub.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'dd-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css'],
})
export class ArticleViewComponent implements OnInit, OnDestroy {
  public loading = false;
  public loadError: any;
  public article: IArticle;

  private _updateSubscription: Subscription;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,
    private updateHub: UpdateHubService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('a_id')) {
        this.article = undefined;
        this.load(params.get('a_id'));
      }
    });

    this._updateSubscription = this.updateHub.articleUpdated
      .pipe(filter((article) => article.id === this.article.id))
      .subscribe((article) => {
        this.article = article;
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
    } catch (err) {
      this.loadError = err;
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

  public get editable() {
    return this.campaignService.canEdit;
  }
}
