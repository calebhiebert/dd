import { Injectable, EventEmitter } from '@angular/core';
import { WebAuth, Auth0DecodedHash, Auth0UserProfile } from 'auth0-js';
import { environment } from 'src/environments/environment';
import { UserService, IUser } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActionQueueService, ActionType } from './action-queue.service';
import * as Sentry from '@sentry/browser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private auth: WebAuth;
  private userData: IUser;

  public onLogin = new EventEmitter<boolean>();
  public loginCompleted = false;
  public loginInProgress = false;
  public authData: Auth0UserProfile;

  private loginPromise: Promise<boolean>;

  constructor(
    private userService: UserService,
    private router: Router,
    private actions: ActionQueueService
  ) {}

  private getAuth(): WebAuth {
    if (this.auth === undefined) {
      this.auth = new WebAuth({
        domain: environment.auth0Domain,
        clientID: environment.auth0ClientId,
        responseType: 'token',
        redirectUri: `${location.protocol}//${location.host}/callback`,
        audience: 'https://dd.panchem.io',
        scope: 'openid',
      });
    }

    return this.auth;
  }

  private getUserInfo(token: string): Promise<Auth0UserProfile> {
    const auth = this.getAuth();

    return new Promise((resolve, reject) => {
      auth.client.userInfo(token, (err, res) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  public resetLoginStatus() {
    this.loginPromise = undefined;
    this.loginInProgress = false;
    this.loginCompleted = false;
  }

  public async isLoggedIn(): Promise<boolean> {
    if (this.loginPromise === undefined) {
      this.loginPromise = new Promise<boolean>(async (resolve, reject) => {
        this.loginInProgress = true;
        const token = this.loadToken();

        if (token === null) {
          resolve(false);
          this.loginInProgress = false;
          return;
        }

        try {
          const userInfo = await this.getUserInfo(token);
          this.authData = userInfo;
          let user;

          try {
            user = await this.userService.getUser(this.authData.sub);
          } catch (err) {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 404) {
                this.loginInProgress = false;
                this.actions.queue.push({
                  type: ActionType.ACCOUNT_SETUP,
                  data: {},
                });
                this.actions.save();
                this.router.navigate(['register']);
                resolve(false);
                return;
              } else {
                throw err;
              }
            } else {
              throw err;
            }
          }

          this.userData = user;

          Sentry.configureScope((scope) => {
            scope.setUser({
              id: userInfo.sub,
              email: userInfo.email,
              email_verified: userInfo.email_verified,
              username: this.userData.username || userInfo.name,
              locale: userInfo.locale,
            });
          });

          this.loginCompleted = true;
          resolve(true);
          this.onLogin.emit();

          // Get a new token right away, this is done because authentication could have succeeded with an old token
          this.checkSession();
        } catch (err) {
          localStorage.removeItem('auth-token');
          resolve(false);
        }

        this.loginInProgress = false;
      });
    }

    return this.loginPromise;
  }

  public saveToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  public loadToken(): string | null {
    const token = localStorage.getItem('auth-token');
    return token;
  }

  public checkSession() {
    const auth = this.getAuth();

    auth.checkSession(
      {
        domain: environment.auth0Domain,
        clientID: environment.auth0ClientId,
        responseType: 'token',
        redirectUri: `${location.protocol}//${location.host}/callback`,
        audience: 'https://dd.panchem.io',
        scope: 'openid',
      },
      (err, res) => {
        if (err) {
          Sentry.captureException(err);
        } else {
          console.log('Refreshed Access Token');

          this.getUserInfo(res.accessToken)
            .then((userInfo) => {
              this.saveToken(res.accessToken);
              this.authData = userInfo;
            })
            .catch((err) => {
              console.log('Error when updating access token', err);
            });
        }
      }
    );

    // Refresh the token every 15 minutes as long as the user is on the page
    setTimeout(() => {
      this.checkSession();
    }, 1000 * 60 * 15);
  }

  public authorize(connection: string) {
    const auth = this.getAuth();

    auth.authorize({
      connection,
    });
  }

  public async logout(): Promise<void> {
    localStorage.removeItem('auth-token');
    this.loginCompleted = false;
    this.loginInProgress = false;
    this.loginPromise = undefined;

    Sentry.configureScope((scope) => {
      scope.setUser(null);
    });
  }

  public process(hash: string, state: string): Promise<Auth0DecodedHash> {
    const auth = this.getAuth();

    return new Promise((resolve, reject) => {
      auth.parseHash(
        {
          hash,
          state,
        },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  public setUserData(userData: IUser) {
    this.userData = userData;
  }

  public get user(): IUser {
    return this.userData;
  }

  public get loggedIn() {
    return this.loginCompleted;
  }

  public get id() {
    return this.authData.sub;
  }
}
