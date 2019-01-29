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

  constructor(
    private noteService: NoteService,
    private campaignService: CampaignService,
    private loginService: LoginService
  ) {}

  ngOnInit() {}

  public noteSelected(note: INote) {
    this.noteService.editNote(note);
  }

  /**
   * Returns the username of the user with the specified id.
   * If the user cannot be found, returns an empty string
   * @param userId
   */
  public getUserText(userId: string): string {
    const user = this.campaignService.getUser(userId);

    if (!user || !user.user) {
      return '';
    }

    return user.user.username;
  }

  public isEditable(note: INote): boolean {
    return note.userId === this.loginService.id || note.publicEdit;
  }
}
