import { Injectable } from '@angular/core';
import { WebAuth, Auth0DecodedHash, Auth0UserProfile } from 'auth0-js';
import { environment } from 'src/environments/environment';
import { createDD } from 'src/dd.twirp';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private auth: WebAuth;
  private userData: User;

  public loginCompleted = false;
  public loginInProgress = false;

  private loginPromise: Promise<boolean>;

  constructor() {}

  private getAuth(): WebAuth {
    if (this.auth === undefined) {
      this.auth = new WebAuth({
        domain: environment.auth0Domain,
        clientID: environment.auth0ClientId,
        responseType: 'token',
        redirectUri: `${location.protocol}//${location.host}/callback`,
      });
    }

    return this.auth;
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
          const dd = createDD('http://localhost:8080');
          const user = await dd.auth({ token });
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

  public saveToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  public loadToken(): string | null {
    return localStorage.getItem('auth-token');
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

  public get user() {
    return this.userData;
  }

  public get loggedIn() {
    return this.loginCompleted;
  }
}
