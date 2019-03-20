import { Component, OnInit, Input } from '@angular/core';
import { ISearchedArticle } from 'src/app/article.service';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { IconService } from 'src/app/icon.service';
import { IConceptType } from 'src/app/concept.service';

@Component({
  selector: 'dd-article-view-card',
  templateUrl: './article-view-card.component.html',
  styleUrls: ['./article-view-card.component.css'],
})
export class ArticleViewCardComponent implements OnInit {
  @Input()
  public article: ISearchedArticle;

  constructor(private router: Router, private campaignService: CampaignService, private iconService: IconService) {}

  ngOnInit() {}

  public get subtitleText() {
    if (this.article.tags) {
      return this.article.tags.join(', ');
    } else {
      return '';
    }
  }

  public get imgSrc() {
    if (this.article.imageURLs && this.article.imageURLs.length > 0) {
      return `https://res.cloudinary.com/dqhk8k6iv/image/fetch/c_fill,g_auto:faces,h_250,w_500/${this.article.imageURLs[0]}`;
    } else {
      return null;
    }
  }

  public get iconSources() {
    if (this.article) {
      const conceptTypes = this.article.conceptTypeIds.map((ctid) => {
        return this.campaignService.campaign.conceptTypes.find((ct) => ct.id === ctid);
      });

      return conceptTypes
        .filter((ct) => ct !== null && ct !== undefined && (ct as any).icon)
        .map((ct: any) => this.iconService.getIconSrc(ct.icon));
    } else {
      return [];
    }
  }
}
