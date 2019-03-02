import { Component, OnInit, Input } from '@angular/core';
import { IArticle, ArticleService } from 'src/app/article.service';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-article-view-mini',
  templateUrl: './article-view-mini.component.html',
  styleUrls: ['./article-view-mini.component.css'],
})
export class ArticleViewMiniComponent implements OnInit {
  @Input()
  public article: IArticle;

  constructor(
    private campaignService: CampaignService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit() {}

  public async removeFromMap() {
    const toUpdateArticle: IArticle = {
      ...this.article,
      mapId: null,
      lat: null,
      lng: null,
      map: null,
    };

    try {
      await this.articleService.updateArticle(toUpdateArticle);
    } catch (err) {
      throw err;
    }
  }

  public viewMore() {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'articles',
      this.article.id,
    ]);
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
