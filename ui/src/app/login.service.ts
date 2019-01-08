import { Injectable } from '@angular/core';
import { WebAuth, Auth0DecodedHash, Auth0UserProfile } from 'auth0-js';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { UserService, IUser } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private auth: WebAuth;
  private userData: IUser;

  public loginCompleted = false;
  public loginInProgress = false;
  public authData: Auth0UserProfile;

  private loginPromise: Promise<boolean>;

  constructor(private userService: UserService, private router: Router) {}

  private getAuth(): WebAuth {
    if (this.auth === undefined) {
      this.auth = new WebAuth({
        domain: environment.auth0Domain,
        clientID: environment.auth0ClientId,
        responseType: 'token',
        redirectUri: `${location.protocol}//${location.host}/callback`,
        audience: 'https://dd.panchem.io',
      });
    }

    return this.auth;
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
                resolve(false);
                this.router.navigate(['register']);
                return;
              } else {
                throw err;
              }
            } else {
              throw err;
            }
          }

          this.userData = user;

          this.loginCompleted = true;
          resolve(true);
        } catch (err) {
          console.log('AUTH ERR', err);
          localStorage.removeItem('auth-token');
          resolve(false);
        }

        this.loginInProgress = false;
      });
    }

    return this.loginPromise;
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

  public saveToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  public loadToken(): string | null {
    const token = localStorage.getItem('auth-token');
    return token;
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
