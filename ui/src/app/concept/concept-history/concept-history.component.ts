import { Component, OnInit } from '@angular/core';
import { ConceptService, IConceptHistory, IConceptHistoryDiff } from 'src/app/concept.service';
import { CampaignService } from 'src/app/campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/user.service';
import { ActionType } from 'src/app/history';
import * as DeepDiff from 'deep-diff';

@Component({
  selector: 'dd-concept-history',
  templateUrl: './concept-history.component.html',
  styleUrls: ['./concept-history.component.css'],
})
export class ConceptHistoryComponent implements OnInit {
  public loadErr: any;
  public loading = false;

  public restoringId: string;

  public conceptHistory: IConceptHistory[];
  public diffedHistory: IConceptHistoryDiff[];

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
      this.diffedHistory = this.makeDiffedHistory(this.conceptHistory);
      console.log(this.diffedHistory);
    } catch (err) {
      this.loadErr = err;
    }

    this.loading = false;
  }

  private prefilterHistory(path, key) {
    return ['id', 'userId', 'dateTime', 'actionType', 'actionSource', 'conceptId', 'conceptTypeId'].indexOf(key) !== -1;
  }

  private makeDiffedHistory(history: IConceptHistory[]) {
    const diffedHistory: IConceptHistoryDiff[] = [];

    for (let i = 0; i < history.length; i++) {
      if (i === 0) {
        diffedHistory.push({ ...history[i], diff: null });
        continue;
      }

      const diff = DeepDiff.diff(history[i - 1], history[i], this.prefilterHistory);

      diffedHistory.push({ ...history[i], diff: diff });
    }

    return diffedHistory;
  }

  public async restore(history: IConceptHistory) {
    this.restoringId = history.id;

    try {
      await this.conceptService.restoreConcept(history.conceptId, history.id);
      this.load(history.conceptId);
    } catch (err) {
      throw err;
    }

    this.restoringId = null;
  }

  public getUser(id: string): IUser {
    const member = this.campaignService.campaign.members.find((m) => m.userId === id);

    if (member) {
      return member.user;
    }

    return null;
  }

  public getDate(history: IConceptHistory) {
    return new Date(history.dateTime);
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

  public get editable() {
    return this.campaignService.canEdit;
  }
}
