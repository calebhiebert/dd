import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from 'src/app/article.service';
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
    private router: Router
  ) {}

  ngOnInit() {}

  public viewMore() {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'articles',
      this.article.id,
    ]);
  }
}
