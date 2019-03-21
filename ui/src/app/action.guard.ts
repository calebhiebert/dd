import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionQueueService, ActionType } from './action-queue.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ActionGuard implements CanActivate {
  constructor(private actions: ActionQueueService, private router: Router, private login: LoginService) {}

  public async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.login.isLoggedIn) {
      return false;
    }

    const queue = this.actions.queue;

    if (queue.length === 0) {
      return true;
    } else {
      const action = queue.pop();
      this.actions.save();

      switch (action.type) {
        case ActionType.ACCOUNT_SETUP:
          this.router.navigate(['register']);
          break;
        case ActionType.INVITE:
          this.router.navigate(['invite', action.data.inviteId]);
          break;
        case ActionType.REDIRECT:
          await this.router.navigateByUrl(action.data.url);
          break;
      }
    }

    return false;
  }
}
