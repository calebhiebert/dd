import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/campaign.service';
import { NoteService, INote } from 'src/app/note.service';

@Component({
  selector: 'dd-note-manager',
  templateUrl: './note-manager.component.html',
  styleUrls: ['./note-manager.component.css'],
})
export class NoteManagerComponent implements OnInit {
  public loadErr: any;
  public loading = false;
  public notes: INote[];

  constructor(private campaignService: CampaignService, private noteService: NoteService) {}

  ngOnInit() {
    this.load();
  }

  private async load() {
    this.loading = true;

    try {
      this.notes = await this.noteService.getNotes(this.campaignService.campaign.id, {});
    } catch (err) {
      this.loadErr = err;
    }

    this.loading = false;
  }

  public selectNote(note: INote) {
    this.noteService.editNote(note);
  }

  public get sortedNotes() {
    if (!this.notes) {
      return null;
    }

    const sortedNotes = {
      quest: [],
      article: [],
      map: [],
      other: [],
    };

    this.notes.forEach((n) => {
      if (n.questId !== null && n.questId !== undefined) {
        sortedNotes.quest.push(n);
      } else if (n.articleId !== null && n.articleId !== undefined) {
        sortedNotes.article.push(n);
      } else if (n.mapId !== null && n.mapId !== undefined) {
        sortedNotes.map.push(n);
      } else {
        sortedNotes.other.push(n);
      }
    });

    return sortedNotes;
  }
}
