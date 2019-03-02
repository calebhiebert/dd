import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { INote } from 'src/app/note.service';
import { ICursorUpdate } from 'src/app/quill/quill.component';
import { LoginService } from 'src/app/login.service';
import { UpdateHubService, ConnectionState } from 'src/app/update-hub.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'dd-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
})
export class NoteFormComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  // Events emitted here are passed to the quill instance
  public cursorUpdates = new EventEmitter<ICursorUpdate>();

  // Events emitted here are passed to the quill instance
  public deltaUpdates = new EventEmitter<any>();

  @Input()
  public set note(note: INote) {
    this._note = note;

    if (this.formGroup) {
      this.formGroup.patchValue(note);
    }
  }

  public get note() {
    return this._note;
  }

  private _note: INote;

  @Output()
  public noteChange = new EventEmitter<INote>();

  @Input()
  public editable = false;

  @Input()
  public advancedEditable = false;

  constructor(
    private login: LoginService,
    private updateHub: UpdateHubService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      content: new FormControl(this.note.content),
      publicView: new FormControl(this.note.publicView),
      publicEdit: new FormControl(this.note.publicEdit),
    });

    this.note.title = 'Placeholder';

    this.formGroup.valueChanges.subscribe((v) => {
      this.note.title = 'Placeholder';
      this.note.publicEdit = v.publicEdit;
      this.note.publicView = v.publicView;
      this.note.content = v.content;
      this.noteChange.emit(this.note);
    });

    this.updateHub.subscribeNote(this.note.id);

    this.updateHub.stateUpdate.subscribe((state) => {
      if (state === ConnectionState.CONNECTED) {
        this.updateHub.subscribeNote(this.note.id);
      }
    });

    this.updateHub.cursorUpdate
      .pipe(filter((cu) => cu.noteId === this.note.id))
      .subscribe((cu) => {
        this.cursorUpdates.emit(cu);
      });

    this.updateHub.noteDeltaUpdate
      .pipe(filter((ndu) => ndu.id === this.note.id))
      .subscribe((ndu) => {
        this.deltaUpdates.emit(ndu.delta);
      });
  }

  ngOnDestroy() {
    this.updateHub.sendNoteCursorUpdate(this.note.id, null);
    this.updateHub.unsubscribeNote(this.note.id);
  }

  public textChange(delta) {
    if (this.note.publicEdit) {
      this.updateHub.sendNoteDeltaUpdate(this.note.id, delta);
    }
  }

  public selectionChange(range) {
    if (this.note.publicEdit) {
      this.updateHub.sendNoteCursorUpdate(this.note.id, range);
    }
  }
}
