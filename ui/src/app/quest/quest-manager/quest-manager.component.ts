import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { IQuest, QuestService } from 'src/app/quest.service';

@Component({
  selector: 'dd-quest-manager',
  templateUrl: './quest-manager.component.html',
  styleUrls: ['./quest-manager.component.css'],
})
export class QuestManagerComponent implements OnInit {
  public loading = false;

  public quests: IQuest[];

  constructor(
    private router: Router,
    private campaignService: CampaignService,
    private questService: QuestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadQuests();
  }

  private async loadQuests() {
    this.loading = true;

    try {
      this.quests = await this.questService.getQuests(
        this.campaignService.campaign.id
      );
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public viewQuest(quest: IQuest) {
    this.router.navigate([quest.id], { relativeTo: this.route });
  }

  public addQuest() {
    this.router.navigate([
      'campaign',
      'manage',
      this.campaignService.campaign.id,
      'quests',
      'create',
    ]);
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
