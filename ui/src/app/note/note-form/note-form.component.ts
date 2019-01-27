import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  public note: INote;

  @Output()
  public noteChange = new EventEmitter<INote>();

  constructor() {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      text: new FormControl(this.note.text),
      publicView: new FormControl(this.note.publicView),
      publicEdit: new FormControl(this.note.publicEdit),
    });

    this.formGroup.valueChanges.subscribe((v) => {
      if (v.text.length > 0) {
        this.note.title = (v.text as string).substring(0, 20);
        this.note.text = v.text;
      } else {
        this.note.title = 'Blank Note';
        this.note.text = 'Blank Note';
      }
      this.note.publicEdit = v.publicEdit;
      this.note.publicView = v.publicView;

      this.noteChange.emit(this.note);
    });
  }

  public submit() {
    if (!this.formGroup.valid) {
      return;
    }
  }
}
