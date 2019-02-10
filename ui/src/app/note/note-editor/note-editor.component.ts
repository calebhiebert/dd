import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NoteService,
  INote,
  NoteType,
  INoteOptions,
} from 'src/app/note.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { CampaignService } from 'src/app/campaign.service';
import { LoginService } from 'src/app/login.service';

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

  private _autosaveInterval = 1500;
  private _lastAutosave = 0;
  private _autosavePromise: Promise<void> = null;
  private _saveTimeout: number;

  constructor(
    private noteService: NoteService,
    private campaignService: CampaignService,
    private loginService: LoginService
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
      case NoteType.MAP:
        noteCreation.mapId = opts.mapId;
        noteCreation.lat = opts.lat;
        noteCreation.lng = opts.lng;
        break;
    }

    try {
      this.note = await this.noteService.createNote(noteCreation);
      this.note.text = '';
      this.note.title = '';
    } catch (err) {
      throw err;
    }

    this.statusText = '';
    this.loading = false;
  }

  private async saveNote() {
    if (this._autosavePromise !== null) {
      await this._autosavePromise;
    }

    this.statusText = 'Saving...';

    try {
      this._autosavePromise = this.noteService.updateNote(this.note);
      await this._autosavePromise;
      this._autosavePromise = null;
    } catch (err) {
      throw err;
    }

    this._lastAutosave = Date.now();
    this.statusText = 'Saved';
  }

  public onNoteChange(note: INote) {
    this.statusText = 'Unsaved';

    if (Date.now() > this._lastAutosave + this._autosaveInterval) {
      this.note = note;
      this.saveNote();
    } else {
      if (this._saveTimeout !== undefined) {
        clearTimeout(this._saveTimeout);
      }

      this._saveTimeout = window.setTimeout(() => {
        this.note = note;
        this.saveNote();
        this._saveTimeout = undefined;
      }, this._autosaveInterval);
    }
  }

  public addNote(opts: INoteOptions) {
    this.createNote(opts);
    this.modal.open().then(() => {
      if (this.note.text === '' && this.note.title === '') {
        this.noteService.deleteNote(this.note.id);
      }

      this.note = undefined;
    });
  }

  public editNote(note: INote) {
    this.note = { ...note };
    this.modal.open().then(() => {
      this.note = undefined;
    });
  }

  public async delete() {
    if (this.note) {
      try {
        await this.noteService.deleteNote(this.note.id);
        this.modal.close(null);
      } catch (err) {
        if (err.message.indexOf('Cannot close modal') !== -1) {
          // Do nothing
        } else {
          throw err;
        }
      }
    }
  }

  public get editable() {
    return this.note.userId === this.loginService.id || this.note.publicEdit;
  }
}
