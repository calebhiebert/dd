import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/user.service';

@Component({
  selector: 'dd-user-view-nano',
  templateUrl: './user-view-nano.component.html',
  styleUrls: ['./user-view-nano.component.css'],
})
export class UserViewNanoComponent implements OnInit {
  @Input()
  public user: IUser;

  constructor() {}

  ngOnInit() {}
}
