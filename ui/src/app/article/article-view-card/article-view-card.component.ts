import { Component, OnInit, Input } from '@angular/core';
import { IArticle, ISearchedArticle } from 'src/app/article.service';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-article-view-card',
  templateUrl: './article-view-card.component.html',
  styleUrls: ['./article-view-card.component.css'],
})
export class ArticleViewCardComponent implements OnInit {
  @Input()
  public article: ISearchedArticle;

  constructor(
    private router: Router,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {}

  public viewOnMap() {
    this.router.navigate(
      [
        'campaigns',
        this.campaignService.campaign.id,
        'maps',
        this.article.mapId,
      ],
      {
        queryParams: {
          lat: this.article.lat,
          lng: this.article.lng,
        },
      }
    );
  }

  public get subtitleText() {
    if (this.article.tags) {
      return this.article.tags.join(', ');
    } else {
      return '';
    }
  }

  public get imgSrc() {
    if (this.article.imageURLs.length > 0) {
      return `https://res.cloudinary.com/dqhk8k6iv/image/fetch/c_fill,g_auto:faces,h_250,w_500/${
        this.article.imageURLs[0]
      }`;
    } else {
      return null;
    }
  }
}
