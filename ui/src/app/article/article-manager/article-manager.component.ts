import { Component, OnInit } from '@angular/core';
import { IArticle, ArticleService } from 'src/app/article.service';
import { CampaignService } from 'src/app/campaign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dd-article-manager',
  templateUrl: './article-manager.component.html',
  styleUrls: ['./article-manager.component.css'],
})
export class ArticleManagerComponent implements OnInit {
  public loading = false;
  public articles: IArticle[];

  constructor(
    private campaignService: CampaignService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  private async load() {
    this.loading = true;

    try {
      this.articles = await this.articleService.getArticles(
        this.campaignService.campaign.id
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

  public viewArticle(article: IArticle) {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'articles', article.id]);
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
