import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ActionQueueService, ActionType } from './action-queue.service';
import { ActionSequence } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class ActionGuard implements CanActivate {
  constructor(private actions: ActionQueueService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const queue = this.actions.queue;

    if (queue.length === 0) {
      return true;
    } else {
      const action = queue.pop();
      this.actions.save();
      console.log('Routing based on action', action);

      switch (action.type) {
        case ActionType.ACCOUNT_SETUP:
          this.router.navigate(['register']);
          break;
        case ActionType.INVITE:
          this.router.navigate(['invite', action.data.inviteId]);
          break;
      }
    }

    return false;
  }
}
