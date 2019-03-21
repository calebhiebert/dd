import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private login: LoginService, private route: ActivatedRoute) {}

  public async ngOnInit() {
    const mode = this.route.snapshot.url[0].path;

    if (mode === 'callback') {
      this.login.processLoginCallback(window.location.hash);
    }
  }

  public authGoog() {
    this.login.authorize('google-oauth2');
  }

  public authFb() {
    this.login.authorize('facebook');
  }

  public get id() {
    return 'dummy';
  }

  public get busy() {
    return this.login.busy;
  }
}
