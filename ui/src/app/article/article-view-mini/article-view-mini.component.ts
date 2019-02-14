import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from 'src/app/article.service';

@Component({
  selector: 'dd-article-view-mini',
  templateUrl: './article-view-mini.component.html',
  styleUrls: ['./article-view-mini.component.css'],
})
export class ArticleViewMiniComponent implements OnInit {
  @Input()
  public article: IArticle;

  constructor() {}

  ngOnInit() {}
}
