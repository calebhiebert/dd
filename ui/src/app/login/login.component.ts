import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private login: LoginService, private route: ActivatedRoute, private router: Router) {}

  public async ngOnInit() {
    const mode = this.route.snapshot.url[0].path;

    if (mode === 'callback' && window.location.hash) {
      const hash = window.location.hash;
      this.router.navigate([], { replaceUrl: true });
      this.login.processLoginCallback(hash);
    }
  }

  public authGoog() {
    this.login.authorize('google-oauth2', this.lastLoginWasGoogle ? this.lastUsedLogin.email : undefined);
  }

  public authFb() {
    this.login.authorize('facebook');
  }

  public useLastLogin() {
    if (this.lastLoginWasFacebook) {
      this.authFb();
    } else if (this.lastLoginWasGoogle) {
      this.authGoog();
    }
  }

  public get id() {
    return 'dummy';
  }

  public get busy() {
    return this.login.busy;
  }

  public get lastUsedLogin() {
    return this.login.lastUsedLogin;
  }

  public get lastLoginWasGoogle() {
    return this.lastUsedLogin && this.lastUsedLogin.sub.startsWith('google');
  }

  public get lastLoginWasFacebook() {
    return this.lastUsedLogin && this.lastUsedLogin.sub.startsWith('facebook');
  }
}
