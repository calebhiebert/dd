import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { INote } from 'src/app/note.service';
import Quill from 'quill';

@Component({
  selector: 'dd-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
})
export class NoteFormComponent implements OnInit, AfterViewInit {
  public formGroup: FormGroup;

  @Input()
  public set note(note: INote) {
    this._note = note;

    if (this._quill && !this.editable && note.content && note.content.ops) {
      this._quill.setContents(note.content.ops);
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

  @ViewChild('editor')
  private _editor: ElementRef<HTMLDivElement>;
  private _quill: Quill;

  constructor() {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      publicView: new FormControl(this.note.publicView),
      publicEdit: new FormControl(this.note.publicEdit),
    });

    this.note.title = 'Placeholder';

    this.formGroup.valueChanges.subscribe((v) => {
      this.note.title = 'Placeholder';
      this.note.publicEdit = v.publicEdit;
      this.note.publicView = v.publicView;
      this.noteChange.emit(this.note);
    });
  }

  ngAfterViewInit() {
    this._quill = new Quill(this._editor.nativeElement, {
      theme: this.editable ? 'snow' : undefined,
      modules: {
        toolbar: this.editable
          ? [['bold', 'italic', 'underline', 'strike']]
          : false,
      },
      placeholder: 'Note goes here!',
      readOnly: !this.editable,
    });

    if (!this.editable) {
      this._editor.nativeElement
        .querySelectorAll('.ql-editor')
        .forEach((el) => el.classList.add('p-0'));
    }

    this._quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'api') {
        return;
      }

      this.note.content = this._quill.getContents();
      this.noteChange.emit(this.note);
    });

    if (this.note.content && this.note.content.ops) {
      this._quill.setContents(this.note.content.ops);
    }
  }
}
