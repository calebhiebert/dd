import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { IArticle, ArticleService } from 'src/app/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { Subscription } from 'rxjs';
import { UpdateHubService } from 'src/app/update-hub.service';
import { filter } from 'rxjs/operators';
import Quill from 'quill';

import BlotFormatter from 'quill-blot-formatter';

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'dd-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css'],
})
export class ArticleViewComponent implements OnInit, OnDestroy, AfterViewInit {
  public loading = false;
  public article: IArticle;

  @ViewChild('contentcontainer')
  private _quillContainer: ElementRef<HTMLDivElement>;

  private _updateSubscription: Subscription;
  private _quill: Quill;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,
    private updateHub: UpdateHubService,
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

  ngAfterViewInit() {
    this._quill = new Quill(this._quillContainer.nativeElement, {
      modules: {
        toolbar: false,
      },

      readOnly: true,
    });

    this._quillContainer.nativeElement.querySelectorAll('.ql-editor').forEach((n) => n.classList.add('p-0'));
  }

  private async load(id: string) {
    this.loading = true;

    if (this._quill) {
      this._quill.setContents([]);
    }

    try {
      this.article = await this.articleService.getArticle(id);

      if (this.article.content && this.article.content.ops) {
        this._quill.setContents(this.article.content.ops);

        this.setupArticleMentions(this._quillContainer.nativeElement.querySelectorAll('[data-type="article"]'));

        this.setupImages(this._quillContainer.nativeElement.querySelectorAll('img'));
      }
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  private setupArticleMentions(nodes: NodeListOf<HTMLSpanElement>) {
    nodes.forEach((node) => {
      const id = node.dataset.id;

      node.addEventListener('click', () => {
        this.router.navigate(['campaigns', this.campaignService.campaign.id, 'articles', id]);
      });
    });
  }

  private setupImages(nodes: NodeListOf<HTMLImageElement>) {
    nodes.forEach((n) => {
      n.classList.add('img-responsive');
    });
  }

  public edit() {
    this.router.navigate(['campaign', 'manage', this.campaignService.campaign.id, 'articles', this.article.id, 'edit']);
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
