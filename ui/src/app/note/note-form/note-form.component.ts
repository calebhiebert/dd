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

@Component({
  selector: 'dd-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
})
export class NoteFormComponent implements OnInit {
  public formGroup: FormGroup;

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

  constructor() {}

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
  }
}
