import { Component, OnInit, Input } from '@angular/core';
import { IArticle, ISearchedArticle } from 'src/app/article.service';

@Component({
  selector: 'dd-article-view-card',
  templateUrl: './article-view-card.component.html',
  styleUrls: ['./article-view-card.component.css'],
})
export class ArticleViewCardComponent implements OnInit {
  @Input()
  public article: ISearchedArticle;

  constructor() {}

  ngOnInit() {}

  public get subtitleText() {
    if (this.article.tags) {
      return this.article.tags.join(', ');
    } else {
      return '';
    }
  }
}
