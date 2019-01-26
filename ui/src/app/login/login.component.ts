import { Component, OnInit, EventEmitter } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public processing = false;

  constructor(
    private login: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public async ngOnInit() {
    const mode = this.route.snapshot.url[0].path;

    if (mode === 'callback') {
      this.processing = true;

      try {
        const auth = await this.login.process(window.location.hash, null);

        this.login.saveToken(auth.accessToken);
        const loginSuccess = await this.login.isLoggedIn();
        if (loginSuccess) {
          await this.router.navigate(['home']);
        }
      } catch (err) {
        // Handle invalid state
        if (err && err.error === 'invalid_token') {
          this.router.navigate(['login']);
        } else {
          throw err;
        }
      }
      this.processing = false;
    }
  }

  public authGoog() {
    this.login.authorize('google-oauth2');
  }

  public authFb() {
    this.login.authorize('facebook');
  }
}
