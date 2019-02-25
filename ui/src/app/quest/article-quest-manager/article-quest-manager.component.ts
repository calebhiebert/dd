import { Component, OnInit, Input } from '@angular/core';
import {
  IArticle,
  ArticleService,
  IArticleQuest,
} from 'src/app/article.service';

@Component({
  selector: 'dd-article-quest-manager',
  templateUrl: './article-quest-manager.component.html',
  styleUrls: ['./article-quest-manager.component.css'],
})
export class ArticleQuestManagerComponent implements OnInit {
  @Input()
  public article: IArticle;

  public articleQuests: IArticleQuest[];

  public loading = false;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.load();
  }

  private async load() {
    this.loading = true;

    try {
      this.articleQuests = await this.articleService.getArticleQuests(
        this.article.id
      );
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }
}
