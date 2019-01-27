import { Component, OnInit, Input } from '@angular/core';
import { INote, NoteService } from 'src/app/note.service';
import { NoteEditorComponent } from '../note-editor/note-editor.component';

@Component({
  selector: 'dd-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit {
  @Input()
  public notes: INote[];

  constructor(private noteService: NoteService) {}

  ngOnInit() {}

  public noteSelected(note: INote) {
    this.noteService.editNote(note);
  }
}
