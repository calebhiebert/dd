import { Component, OnInit } from '@angular/core';
import { IArticle, ArticleService } from 'src/app/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css'],
})
export class ArticleViewComponent implements OnInit {
  public loading = false;
  public article: IArticle;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('a_id')) {
        this.load(params.get('a_id'));
      }
    });
  }

  private async load(id: string) {
    this.loading = true;

    try {
      this.article = await this.articleService.getArticle(id);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public edit() {
    this.router.navigate([
      'campaign',
      'manage',
      this.campaignService.campaign.id,
      'articles',
      this.article.id,
      'edit',
    ]);
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
