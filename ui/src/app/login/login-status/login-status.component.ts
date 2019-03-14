import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/modal/modal.component';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'dd-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  @ViewChild('modal')
  private _modal: ModalComponent<any>;

  constructor(private login: LoginService) {}

  ngOnInit() {
    this.login.loginStatus.subscribe((status) => {
      try {
        if (status === true) {
          this._modal.open();
        } else {
          this._modal.close(null);
        }
      } catch (err) {
        // Ignore error
      }
    });

    try {
      if (this.login.loginInProgress) {
        this._modal.open();
      } else {
        this._modal.close(null);
      }
    } catch (err) {
      // Ignore error
    }
  }
}
