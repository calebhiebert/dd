import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { ActionQueueService, ActionType } from './action-queue.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router, private action: ActionQueueService) {}

  public async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isLoggedIn = this.login.isLoggedIn;

    if (!isLoggedIn) {
      this.action.queue.push({
        type: ActionType.REDIRECT,
        data: {
          url: state.url,
        },
      });
      this.action.save();
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
