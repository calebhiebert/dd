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
import Quill from 'quill';

@Component({
  selector: 'dd-note-view-mini',
  templateUrl: './note-view-mini.component.html',
  styleUrls: ['./note-view-mini.component.css'],
})
export class NoteViewMiniComponent implements OnInit, AfterViewInit {
  @Input()
  public note: INote;

  @ViewChild('notedisplay')
  private _noteDisplay: ElementRef<HTMLDivElement>;
  private _quill: Quill;

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

        if (this._quill && n.content && n.content.ops) {
          this._quill.setContents(n.content.ops);
        }
      });
  }

  ngAfterViewInit() {
    this._quill = new Quill(this._noteDisplay.nativeElement, {
      modules: {
        toolbar: false,
      },
      readOnly: true,
    });

    if (this.note.content && this.note.content.ops) {
      this._quill.setContents(this.note.content.ops);
    }

    this._noteDisplay.nativeElement
      .querySelectorAll('.ql-editor')
      .forEach((el) => el.classList.add('p-0'));
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
