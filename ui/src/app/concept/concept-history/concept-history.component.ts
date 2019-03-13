import { Component, OnInit } from '@angular/core';
import { ConceptService, IConceptHistory } from 'src/app/concept.service';
import { CampaignService } from 'src/app/campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/user.service';
import { ActionType } from 'src/app/history';

@Component({
  selector: 'dd-concept-history',
  templateUrl: './concept-history.component.html',
  styleUrls: ['./concept-history.component.css'],
})
export class ConceptHistoryComponent implements OnInit {
  public loadErr: any;
  public loading = false;

  public conceptHistory: IConceptHistory[];

  constructor(
    private conceptService: ConceptService,
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('c_id');
      const typeId = params.get('ct_id');

      this.load(id);
    });
  }

  private async load(id: string) {
    this.loading = true;

    try {
      this.conceptHistory = await this.conceptService.getConceptHistory(id);
    } catch (err) {
      this.loadErr = err;
    }

    this.loading = false;
  }

  public getUser(id: string): IUser {
    const member = this.campaignService.campaign.members.find(
      (m) => m.userId === id
    );

    if (member) {
      return member.user;
    }

    return null;
  }

  public getEntryActionText(history: IConceptHistory) {
    switch (history.actionType) {
      case ActionType.CREATE:
        return 'created';
      case ActionType.DELETE:
        return 'deleted';
      case ActionType.UPDATE:
        return 'updated';
      case ActionType.RESTORE:
        return 'restored';
    }
  }
}
