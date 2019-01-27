import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NoteService,
  INote,
  NoteType,
  INoteOptions,
} from 'src/app/note.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css'],
})
export class NoteEditorComponent implements OnInit {
  @ViewChild('modal')
  private modal: ModalComponent<any>;

  public statusText: string = '';

  public loading = false;

  public note: INote;

  constructor(
    private noteService: NoteService,
    private campaignService: CampaignService
  ) {
    noteService.setNoteEditor(this);
  }

  ngOnInit() {}

  private async createNote(opts: INoteOptions) {
    this.loading = true;
    this.statusText = 'Creating new note...';

    const noteCreation: INote = {
      title: 'UNNAMED_NOTE',
      text: 'TEXT',
      campaignId: this.campaignService.campaign.id,
      publicEdit: false,
      publicView: false,
    };

    switch (opts.type) {
      case NoteType.QUEST:
        noteCreation.questId = opts.questId;
        break;
    }

    try {
      this.note = await this.noteService.createNote(noteCreation);
      this.note.text = '';
      this.note.title = '';
      this.statusText = '';
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public addNote(opts: INoteOptions) {
    this.createNote(opts);
    this.modal.open();
  }
}
