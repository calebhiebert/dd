import { Injectable, EventEmitter } from '@angular/core';
import { WebAuth, Auth0DecodedHash, Auth0UserProfile } from 'auth0-js';
import { environment } from 'src/environments/environment';
import { UserService, IUser } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActionQueueService, ActionType } from './action-queue.service';
import * as Sentry from '@sentry/browser';
import Swal from 'sweetalert2';

export interface ILoginData {
  token: string;
  expiresAt: number;
  profile?: Auth0UserProfile;
  user?: IUser;
}

export enum LoginStatus {
  LOGGED_IN,
  LOGGING_IN,
  NOT_LOGGED_IN,
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public busy = false;
  public loginStatus = new EventEmitter<LoginStatus>();

  private _auth: WebAuth;
  private _loginData: ILoginData;

  constructor(private userService: UserService, private router: Router, private actions: ActionQueueService) {
    this._loginData = this.loadLoginData();

    if (this.isLoggedIn) {
      // Check if the token is expired, will make sure there are at least 60 seconds of valid token left
      const isExpired = this._loginData.expiresAt - Math.floor(new Date().getTime() / 1000) < 60;

      if (isExpired) {
        this.logout();
      } else {
        this.checkSession();
      }
    }
  }

  /**
   * returns an auth instance
   */
  private getAuth(): WebAuth {
    if (this._auth === undefined) {
      this._auth = new WebAuth({
        domain: environment.auth0Domain,
        clientID: environment.auth0ClientId,
        responseType: 'token',
        redirectUri: `${location.protocol}//${location.host}/callback`,
        audience: 'https://dd.panchem.io',
        scope: 'openid profile email',
      });
    }

    return this._auth;
  }

  /**
   * Gets user info from auth0
   */
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

  /**
   * Attempts to obtain a new auth0 token based on existing details
   */
  private checkSession() {
    const auth = this.getAuth();

    auth.checkSession(
      {
        domain: environment.auth0Domain,
        clientID: environment.auth0ClientId,
        responseType: 'token',
        redirectUri: `${location.protocol}//${location.host}/callback`,
        audience: 'https://dd.panchem.io',
        scope: 'openid profile email',
      },
      (err, res) => {
        if (err) {
          Sentry.captureException(err);
        } else {
          this._loginData.token = res.accessToken;
          this._loginData.expiresAt = Math.floor(new Date().getTime() / 1000) + res.expiresIn;
          this.saveLoginData(this._loginData);
        }
      }
    );

    // Refresh the token every 15 minutes as long as the user is on the page
    setTimeout(() => {
      this.checkSession();
    }, 1000 * 60 * 15);
  }

  /**
   * Sets the local login data
   */
  private saveLoginData(loginData: ILoginData) {
    this._loginData = loginData;
    localStorage.setItem('login-data', JSON.stringify(loginData));
  }

  private clearLoginData() {
    localStorage.removeItem('login-data');
  }

  private loadLoginData(): ILoginData | null {
    const loginData = localStorage.getItem('login-data');

    if (loginData) {
      return JSON.parse(loginData);
    } else {
      return null;
    }
  }

  /**
   * Processes an auth0 hash response
   */
  public parseHash(hash: string, state: string): Promise<Auth0DecodedHash> {
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

  /**
   * Starts the authorization process with auth0
   */
  public authorize(connection: string) {
    const auth = this.getAuth();

    auth.authorize({
      connection,
    });
  }

  /**
   * Clears all user authentication data
   */
  public async logout() {
    this.clearLoginData();
    Sentry.configureScope((scope) => {
      scope.setUser(null);
    });
    this._loginData = null;
    this.loginStatus.emit(LoginStatus.NOT_LOGGED_IN);
  }

  public async processLoginCallback(hash: string) {
    this.busy = true;
    this.loginStatus.emit(LoginStatus.LOGGING_IN);

    try {
      // Parse the hash
      try {
        const auth = await this.parseHash(hash, null);
        const expiresAt = Math.floor(new Date().getTime() / 1000) + auth.expiresIn;
        this.saveLoginData({
          token: auth.accessToken,
          expiresAt: expiresAt,
        });
      } catch (err) {
        // Handle invalid state
        if (err && err.error === 'invalid_token') {
          // Make sure there is no leftover login data
          this.logout();
          this.router.navigate(['login']);
        } else {
          Swal.fire({
            title: 'Oh dear.',
            text: 'Something went wrong while logging you in, please try again.',
          }).then(() => {
            this.logout();
            this.router.navigate(['login']);
          });
        }
      }

      const userInfo = await this.getUserInfo(this._loginData.token);
      this._loginData.profile = userInfo;
      this.saveLoginData(this._loginData);

      // Check to see if a user is in the database
      try {
        const user = await this.userService.getUser(userInfo.sub);
        this._loginData.user = user;
        this.saveLoginData(this._loginData);
        this.loginStatus.emit(LoginStatus.LOGGED_IN);
      } catch (err) {
        if (err instanceof HttpErrorResponse && err.status === 404) {
          // User needs to setup their account
          this.actions.queue.push({ type: ActionType.ACCOUNT_SETUP, data: null });
          this.actions.save();
          this.router.navigate(['register'], { replaceUrl: true });
          return;
        } else {
          console.log(err);
          throw err;
        }
      }
    } catch (err) {
      // Handle invalid state
      if (err && err.error === 'invalid_token') {
        // Make sure there is no leftover login data
        await this.logout();
        this.router.navigate(['login']);
      } else {
        Swal.fire({
          title: 'Whoops',
          text: 'Something went wrong while logging you in, please try again.',
        }).then(() => {
          this.router.navigate(['login']);
        });
      }
    }

    // Refresh the token every 15 minutes as long as the user is on the page
    setTimeout(() => {
      this.checkSession();
    }, 1000 * 60 * 15);

    this.router.navigate(['home'], { replaceUrl: true });
    this.busy = false;
  }

  public setUser(user: IUser) {
    if (!this._loginData) {
      throw new Error('Cannot set user when login data missing');
    }

    this._loginData.user = user;
    this.saveLoginData(this._loginData);
  }

  public get id(): string | null {
    if (this._loginData && this._loginData.profile) {
      return this._loginData.profile.sub;
    } else {
      return null;
    }
  }

  public get userProfile(): Auth0UserProfile | null {
    if (this._loginData && this._loginData.profile) {
      return this._loginData.profile;
    } else {
      return null;
    }
  }

  public get currentUser(): IUser | null {
    if (this._loginData && this._loginData.user) {
      return this._loginData.user;
    } else {
      return null;
    }
  }

  public get token(): string | null {
    if (this._loginData && this._loginData.token) {
      return this._loginData.token;
    } else {
      return null;
    }
  }

  public get isLoggedIn(): boolean {
    if (!this._loginData || !this._loginData.user) {
      return false;
    } else {
      return true;
    }
  }
}
