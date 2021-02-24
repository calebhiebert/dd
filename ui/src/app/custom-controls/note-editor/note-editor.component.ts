import { Component, OnInit, ViewChild } from '@angular/core';
import { NoteService, INote, NoteType, INoteOptions } from 'src/app/note.service';
import { CampaignService } from 'src/app/campaign.service';
import { LoginService } from 'src/app/login.service';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ModalComponent } from 'src/app/custom-controls/modal/modal.component';
import { NoteFormComponent } from '../note-form/note-form.component';

@Component({
  selector: 'dd-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css'],
})
export class NoteEditorComponent implements OnInit {
  @ViewChild('modal', { static: true })
  private modal: ModalComponent<any>;
  public loading = false;
  public unsaved = false;

  public note: INote;

  private _autosaveInterval = 1500;
  private _lastAutosave = 0;
  private _autosavePromise: Promise<void> = null;
  private _saveTimeout: number;

  @ViewChild('noteform', { static: false })
  private _noteForm: NoteFormComponent;

  constructor(private noteService: NoteService, private campaignService: CampaignService, private loginService: LoginService) {
    noteService.setNoteEditor(this);
  }

  ngOnInit() {
    this.noteService.noteUpdate.pipe(filter((note) => this.note && note.id === this.note.id)).subscribe((note) => {
      if (!this.editable) {
        this.note = note;

        // For some reason the note form will not trigger updates unless explicitly set
        if (this._noteForm) {
          this._noteForm.note = note;
        }
      }
    });
  }

  private async createNote(opts: INoteOptions) {
    this.loading = true;

    const noteCreation: INote = {
      title: 'UNNAMED_NOTE',
      userId: this.loginService.id,
      content: null,
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
        noteCreation.mapShape = opts.mapShape;
        break;
      case NoteType.ARTICLE:
        noteCreation.articleId = opts.articleId;
        break;
    }

    try {
      this.note = await this.noteService.createNote(noteCreation);
      this.note.title = '';
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  private async saveNote() {
    if (this._autosavePromise !== null) {
      await this._autosavePromise;
    }

    this.loading = true;

    try {
      this._autosavePromise = this.noteService.updateNote(this.note);
      await this._autosavePromise;
      this._autosavePromise = null;
    } catch (err) {
      throw err;
    }

    this._lastAutosave = Date.now();
    this.loading = false;
    this.unsaved = false;
  }

  public onNoteChange(note: INote) {
    if (!this.editable) {
      return;
    }

    if (Date.now() > this._lastAutosave + this._autosaveInterval) {
      this.note = note;
      this.saveNote();
    } else {
      this.unsaved = true;
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

  public async addNote(opts: INoteOptions) {
    await this.createNote(opts);

    this.modal.open().then(() => {
      if (this.note.content === null && this.note.title === '') {
        this.noteService.deleteNote(this.note.id);
      }

      this.note = undefined;
    });
  }

  public async editNote(note: INote) {
    this.modal.open().then(() => {
      this.note = undefined;
    });

    this.loading = true;

    try {
      this.note = await this.noteService.getNote(note.id);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public async delete() {
    if (this.note && (await Swal.fire({ text: 'Are you sure?', showCancelButton: true })).value === true) {
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

  public get advancedEditable() {
    return this.note.userId === this.loginService.id;
  }

  public get user() {
    if (!this.note) {
      return null;
    }

    if (this.note.user) {
      return this.note.user;
    }

    const userFromMembers = this.campaignService.campaign.members.find((m) => m.userId === this.note.userId);

    if (userFromMembers && userFromMembers.user) {
      return userFromMembers.user;
    }
  }

  public get campaign() {
    return this.campaignService.campaign;
  }
}
