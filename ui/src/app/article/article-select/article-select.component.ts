import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/modal/modal.component';
import { CampaignService } from 'src/app/campaign.service';
import { ArticleService, IArticle } from 'src/app/article.service';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'dd-article-select',
  templateUrl: './article-select.component.html',
  styleUrls: ['./article-select.component.css'],
})
export class ArticleSelectComponent implements OnInit {
  public loading = false;
  public articles: IArticle[];

  public searchControl: FormControl;
  public search: string;

  @ViewChild('modal')
  private modal: ModalComponent<any>;

  private _selectResolver: any;

  constructor(
    private campaignService: CampaignService,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.searchControl = new FormControl(null);

    this.searchControl.valueChanges
      .pipe(debounceTime(250))
      .subscribe((search) => {
        this.search = search;
        this.load();
      });

    this.load();
  }

  private async load() {
    this.loading = true;

    try {
      this.articles = await this.articleService.getArticles(
        this.campaignService.campaign.id,
        10,
        0,
        this.search ? this.search : null
      );
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public selectArticle(article: IArticle) {
    if (this._selectResolver) {
      this._selectResolver(article);
    } else {
      console.warn('Article was selected but no resolver was present');
    }

    try {
      this.modal.close(null);
    } catch (err) {
      // Ignore this
    }
  }

  public openArticleSelector(): Promise<IArticle> {
    this.modal.open().then(() => {
      if (this._selectResolver) {
        this._selectResolver(null);
        this._selectResolver = undefined;
      }
    });

    return new Promise((resolve) => {
      this._selectResolver = resolve;
    });
  }
}
