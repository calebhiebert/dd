import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IUser, UserService } from 'src/app/user.service';

@Component({
  selector: 'dd-user-view-mini',
  templateUrl: './user-view-mini.component.html',
  styleUrls: ['./user-view-mini.component.css'],
})
export class UserViewMiniComponent implements OnInit {
  @Input()
  public userId: string;

  public loading = false;

  @Input()
  public user: IUser;

  // Called when something would cause the size of the element to change
  // mainly for popper
  @Output()
  public valueUpdate = new EventEmitter<any>();

  constructor(private userSerivce: UserService) {}

  ngOnInit() {
    if (!this.user) {
      this.load();
    }
  }

  private async load() {
    this.emitValueUpdate();
    this.loading = true;

    try {
      this.user = await this.userSerivce.getUser(this.userId);
      this.emitValueUpdate();
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  private emitValueUpdate() {
    setTimeout(() => {
      this.valueUpdate.emit();
    }, 1);
  }
}
