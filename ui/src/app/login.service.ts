import { Injectable } from '@angular/core';
import { WebAuth, Auth0DecodedHash, Auth0UserProfile } from 'auth0-js';
import { environment } from 'src/environments/environment';
import { dd } from 'src/dd.pb';
import { RpcService } from './rpc.service';
import Axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private auth: WebAuth;
  private userData: dd.IUser;

  public registrationRequired = false;
  public loginCompleted = false;
  public loginInProgress = false;

  private loginPromise: Promise<boolean>;

  constructor(private rpc: RpcService) {}

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
          const authResult = await this.rpc.dd.auth({ token });
          this.userData = authResult.user;
          this.registrationRequired = authResult.reigstrationRequired;
          this.loginCompleted = true;
          this.saveToken(token);
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
    Axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
  }

  public loadToken(): string | null {
    const token = localStorage.getItem('auth-token');

    Axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
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

  public setUserData(userData: dd.IUser) {
    this.userData = userData;
  }

  public get user() {
    return this.userData;
  }

  public get loggedIn() {
    return this.loginCompleted;
  }
}
