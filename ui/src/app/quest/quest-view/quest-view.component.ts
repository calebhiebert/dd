import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuest, QuestService } from 'src/app/quest.service';
import { CampaignService } from 'src/app/campaign.service';
import { NoteService, NoteType } from 'src/app/note.service';

@Component({
  selector: 'dd-quest-view',
  templateUrl: './quest-view.component.html',
  styleUrls: ['./quest-view.component.css'],
})
export class QuestViewComponent implements OnInit {
  public loading = false;
  public loadError: any;
  public quest: IQuest;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questService: QuestService,
    private campaignService: CampaignService,
    private noteService: NoteService
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
      this.noteService.getNotes(this.campaignService.campaign.id, {
        questId: this.quest.id,
      });
    } catch (err) {
      this.loadError = err;
    }

    this.loading = false;
  }

  public addNote() {
    this.noteService.addNote({
      type: NoteType.QUEST,
      questId: this.quest.id,
    });
  }

  public edit() {
    if (!this.editable) {
      return;
    }

    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'quests', this.quest.id, 'edit']);
  }

  public get editable() {
    return this.campaignService.canEdit;
  }

  public get notes() {
    if (this.quest) {
      return this.noteService.getQuestNotes(this.quest.id);
    } else {
      return [];
    }
  }
}
