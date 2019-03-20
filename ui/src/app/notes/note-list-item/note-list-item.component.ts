import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { INote } from 'src/app/note.service';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.css'],
})
export class NoteListItemComponent implements OnInit {
  @Input()
  public note: INote;

  @Output()
  public select = new EventEmitter<INote>();

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public doSelect() {
    this.select.emit(this.note);
  }

  public get user() {
    return this.campaignService.campaign.members.find((m) => m.userId === this.note.userId).user;
  }
}
