import { Component, OnInit } from '@angular/core';
import { QuestService, IQuest, QuestStatus } from 'src/app/quest.service';
import { CampaignService } from 'src/app/campaign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dd-quest-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css'],
})
export class QuickViewComponent implements OnInit {
  public loading = false;
  public quests: IQuest[];

  constructor(
    private router: Router,
    private questService: QuestService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.loadQuests();
  }

  public viewQuest(quest: IQuest) {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'quests',
      quest.id,
    ]);
  }

  private async loadQuests() {
    this.loading = true;

    try {
      this.quests = await this.questService.getQuests(
        this.campaignService.campaign.id,
        null,
        null,
        null,
        null,
        null,
        [QuestStatus.IN_PROGRESS]
      );
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }
}
