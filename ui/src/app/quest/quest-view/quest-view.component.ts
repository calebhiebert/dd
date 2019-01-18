import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuest, QuestService } from 'src/app/quest.service';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-quest-view',
  templateUrl: './quest-view.component.html',
  styleUrls: ['./quest-view.component.css'],
})
export class QuestViewComponent implements OnInit {
  public loading = false;
  public quest: IQuest;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questService: QuestService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('q_id')) {
        this.quest = undefined;
        this.loadQuest(params.get('q_id'));
      }
    });
  }

  private async loadQuest(id: string) {
    this.loading = true;

    try {
      this.quest = await this.questService.getQuest(id);
    } catch (err) {
      console.log(err);
    }

    this.loading = false;
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
