import { Component, OnInit, Input } from '@angular/core';
import { INote, NoteService } from 'src/app/note.service';
import { NoteEditorComponent } from '../note-editor/note-editor.component';
import { CampaignService } from 'src/app/campaign.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'dd-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit {
  @Input()
  public notes: INote[];

  constructor(private noteService: NoteService, private campaignService: CampaignService, private loginService: LoginService) {}

  ngOnInit() {}

  public noteSelected(note: INote) {
    this.noteService.editNote(note);
  }

  public isEditable(note: INote): boolean {
    return note.userId === this.loginService.id || note.publicEdit;
  }

  public user(id: string) {
    return this.campaignService.getUser(id).user;
  }
}
