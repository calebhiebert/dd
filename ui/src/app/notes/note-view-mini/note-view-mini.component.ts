import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { INote, NoteService } from 'src/app/note.service';
import { CampaignService } from 'src/app/campaign.service';
import { LoginService } from 'src/app/login.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'dd-note-view-mini',
  templateUrl: './note-view-mini.component.html',
  styleUrls: ['./note-view-mini.component.css'],
})
export class NoteViewMiniComponent implements OnInit {
  @Input()
  public note: INote;

  constructor(
    private campaignService: CampaignService,
    private login: LoginService,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    this.noteService.noteUpdate
      .pipe(filter((n) => this.note && n.id === this.note.id))
      .subscribe((n) => {
        this.note = n;
      });
  }

  public edit() {
    this.noteService.editNote(this.note);
  }

  public get user() {
    if (!this.note) {
      return null;
    }

    if (this.note.user) {
      return this.note.user;
    }

    const userFromMembers = this.campaignService.campaign.members.find(
      (m) => m.userId === this.note.userId
    );

    if (userFromMembers && userFromMembers.user) {
      return userFromMembers.user;
    }
  }

  public get editable() {
    return this.note.userId === this.login.id || this.note.publicEdit;
  }
}
