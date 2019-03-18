import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/modal/modal.component';
import { CampaignService } from 'src/app/campaign.service';
import { ArticleService, IArticle, ISearchedArticle } from 'src/app/article.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'dd-article-select',
  templateUrl: './article-select.component.html',
  styleUrls: ['./article-select.component.css'],
})
export class ArticleSelectComponent implements OnInit {
  public loading = false;
  public articles: ISearchedArticle[];

  public searchControl: FormControl;
  public search: string;

  @ViewChild('modal')
  private modal: ModalComponent<any>;

  private _selectResolver: any;

  constructor(private campaignService: CampaignService, private articleService: ArticleService) {}

  ngOnInit() {
    this.searchControl = new FormControl(null);

    this.searchControl.valueChanges.pipe(debounceTime(250)).subscribe((search) => {
      this.search = search;
      this.load();
    });

    this.load();
  }

  private async load() {
    this.loading = true;

    try {
      this.articles = await this.articleService.getArticles(this.campaignService.campaign.id, 10, 0, this.search ? this.search : null);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public selectArticle(article: ISearchedArticle) {
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

  public openArticleSelector(): Promise<ISearchedArticle> {
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

  public async createFromSearch() {
    const confirmation = await Swal.fire({
      titleText: 'Create a new article?',
      text: `A new article with the name ${this.search.trim()} will be created`,
    });

    if (confirmation.value === true) {
      try {
        const newArticle = await this.articleService.createArticle({
          name: this.search.trim(),
          content: null,
          userId: 'fake',
          published: false,
          tags: ['TODO'],
          campaignId: this.campaignService.campaign.id,
        });

        this.selectArticle({
          id: newArticle.id,
          name: newArticle.name,
          published: newArticle.published,
          userId: newArticle.userId,
          questCount: 0,
          conceptTypeIds: [],
          hasQuests: false,
        });
      } catch (err) {
        throw err;
      }
    }
  }

  public get editable() {
    return this.campaignService.canEdit;
  }

  public get showCreateSuggestion() {
    return this.articles && this.search && this.articles.length > 0 && this.search.trim().length > 2;
  }
}
