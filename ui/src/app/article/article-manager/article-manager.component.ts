import { Component, OnInit } from '@angular/core';
import { IArticle, ArticleService } from 'src/app/article.service';
import { CampaignService } from 'src/app/campaign.service';
import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'dd-article-manager',
  templateUrl: './article-manager.component.html',
  styleUrls: ['./article-manager.component.css'],
})
export class ArticleManagerComponent implements OnInit {
  public loading = false;
  public articles: IArticle[];

  public searchControl: FormControl;
  public search: string = null;

  constructor(
    private campaignService: CampaignService,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.load();

    this.searchControl = new FormControl(
      this.route.snapshot.queryParamMap.has('search')
        ? this.route.snapshot.queryParamMap.get('search')
        : null
    );

    this.searchControl.valueChanges
      .pipe(debounceTime(250))
      .subscribe((search) => {
        if (search.trim().length > 0) {
          this.search = search;
        } else {
          this.search = null;

          // If the articles are empty and the search is null the message for no articles in this campaign will be shown
          if (this.articles.length === 0) {
            this.articles = undefined;
          }
        }

        this.load();
      });
  }

  private async load() {
    this.loading = true;

    try {
      this.articles = await this.articleService.getArticles(
        this.campaignService.campaign.id,
        10,
        0,
        this.search
      );
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public createArticle() {
    this.router.navigate([
      'campaign',
      'manage',
      this.campaignService.campaign.id,
      'articles',
      'create',
    ]);
  }

  public trackArticle(idx: number, article: IArticle): string {
    return article.name;
  }

  public viewArticle(article: IArticle) {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'articles',
      article.id,
    ]);
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
