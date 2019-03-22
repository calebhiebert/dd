import { Component, OnInit } from '@angular/core';
import { IArticle, ArticleService, ISearchedArticle } from 'src/app/article.service';
import { CampaignService } from 'src/app/campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'dd-article-manager',
  templateUrl: './article-manager.component.html',
  styleUrls: ['./article-manager.component.css'],
})
export class ArticleManagerComponent implements OnInit {
  public loading = false;
  public articles: ISearchedArticle[];
  public popularArticles: ISearchedArticle[];

  public searchControl: FormControl;
  public search: string = null;

  constructor(
    private campaignService: CampaignService,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadPopular();
    this.loadFromSearch();

    this.searchControl = new FormControl(
      this.route.snapshot.queryParamMap.has('search') ? this.route.snapshot.queryParamMap.get('search') : null
    );

    this.searchControl.valueChanges.pipe(debounceTime(250)).subscribe((search) => {
      if (search.trim().length > 0) {
        this.search = search;
      } else {
        this.search = null;

        // If the articles are empty and the search is null the message for no articles in this campaign will be shown
        if (this.articles.length === 0) {
          this.articles = undefined;
        }
      }

      this.loadFromSearch();
    });
  }

  private async loadFromSearch() {
    this.loading = true;

    try {
      this.articles = await this.articleService.getArticles(this.campaignService.campaign.id, 10, 0, this.search);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  private async loadPopular() {
    this.loading = true;

    try {
      this.popularArticles = await this.articleService.getPopular(this.campaignService.campaign.id);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public createArticle() {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'articles', 'create']);
  }

  public trackArticle(idx: number, article: ISearchedArticle): string {
    return article.id;
  }

  public trackIdx(idx: number) {
    return idx;
  }

  public viewArticle(article: IArticle) {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'articles', article.id]);
  }

  public get splitArticles() {
    const splitCount = 3;

    if (!this.articles) {
      return [];
    }

    const splitArticles = [];

    for (let i = 0; i < splitCount; i++) {
      splitArticles[i] = [];
    }

    let arrCursor = 0;

    this.articles.forEach((article) => {
      splitArticles[arrCursor].push(article);

      if (arrCursor === splitCount - 1) {
        arrCursor = 0;
      } else {
        arrCursor++;
      }
    });

    return splitArticles;
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
