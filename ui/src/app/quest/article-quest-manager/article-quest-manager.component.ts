import { Component, OnInit, Input } from '@angular/core';
import {
  IArticle,
  ArticleService,
  IArticleQuest,
} from 'src/app/article.service';
import { QuestService, IQuest, QuestStatus } from 'src/app/quest.service';
import { CampaignService } from 'src/app/campaign.service';
import {
  SearchFunction,
  DropdownItemGenerationFunction,
} from 'src/app/autocomplete/autocomplete.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  public onQuestSelected: DropdownItemGenerationFunction;

  public loading = false;

  constructor(
    private articleService: ArticleService,
    private questService: QuestService,
    private campaignService: CampaignService,
    private router: Router
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
      search,
      5,
      0,
      this.articleQuests.map((aq) => aq.questId)
    );

    const mappedQuests: any[] = quests.map((q) => {
      return { ...q, value: q.name };
    });

    if (search.trim().length >= 3) {
      mappedQuests.unshift({ id: 'create-new-quest', value: search });
    }

    return mappedQuests;
  }

  public createAutocompleteItem(item: any) {
    if (item.id === 'create-new-quest') {
      return `<i class="icon icon-plus"></i> ${item.value}`;
    } else {
      return item.name;
    }
  }

  public async remove(articleQuest: IArticleQuest) {
    this.articleQuests = this.articleQuests.filter((aq) => aq !== articleQuest);

    await this.articleService.deleteArticleQuest(articleQuest);
  }

  public async edit(articleQuest: IArticleQuest) {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'quests',
      articleQuest.questId,
      'edit',
    ]);
  }

  public async questSelected(quest: IQuest | any) {
    if (quest.id === 'create-new-quest') {
      const confirmation = await Swal.fire({
        title: 'Create new quest?',
        text: `This will create a new blank quest and attach it to ${
          this.article.name
        }`,
        showCancelButton: true,
      });

      if (confirmation.value !== true) {
        return;
      }

      const name = quest.value;

      const newQuest = await this.questService.createQuest({
        name: name,
        accepted: false,
        available: false,
        visible: false,
        status: QuestStatus.NONE,
        campaignId: this.campaignService.campaign.id,
      });

      await this.questSelected(newQuest);
    } else {
      const existingArticleQuest = this.articleQuests.find(
        (aq) => aq.questId === quest.id
      );

      if (existingArticleQuest !== undefined) {
        return;
      }

      this.articleQuests.push({
        articleId: this.article.id,
        questId: quest.id,
        quest: quest,
      });

      await this.articleService.updateArticleQuest({
        articleId: this.article.id,
        questId: quest.id,
      });
    }
  }

  public async viewQuest(questId: string) {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'quests',
      questId,
    ]);
  }
}
