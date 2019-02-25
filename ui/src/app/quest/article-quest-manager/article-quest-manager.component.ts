import { Component, OnInit, Input } from '@angular/core';
import {
  IArticle,
  ArticleService,
  IArticleQuest,
} from 'src/app/article.service';
import { QuestService, IQuest } from 'src/app/quest.service';
import { CampaignService } from 'src/app/campaign.service';
import { SearchFunction } from 'src/app/autocomplete/autocomplete.component';

@Component({
  selector: 'dd-article-quest-manager',
  templateUrl: './article-quest-manager.component.html',
  styleUrls: ['./article-quest-manager.component.css'],
})
export class ArticleQuestManagerComponent implements OnInit {
  @Input()
  public article: IArticle;

  public articleQuests: IArticleQuest[];
  public doQuestSearch: SearchFunction;

  public loading = false;

  constructor(
    private articleService: ArticleService,
    private questService: QuestService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.doQuestSearch = (search: string) => {
      return this.searchQuests(search);
    };

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

  public async searchQuests(search: string): Promise<any[]> {
    const quests = await this.questService.getQuests(
      this.campaignService.campaign.id,
      search
    );

    return quests.map((q) => {
      return { ...q, value: q.name };
    });
  }

  public remove(aq: IArticleQuest) {
    // Do some things
  }

  public questSelected(quest: IQuest) {
    this.articleQuests.push({
      articleId: this.article.id,
      questId: quest.id,
      quest: quest,
    });
  }
}
