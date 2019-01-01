import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router) {}

  public async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    console.log('Checking login');
    const isLoggedIn = await this.login.isLoggedIn();

    console.log(isLoggedIn);

    if (!isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
