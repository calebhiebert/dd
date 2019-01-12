import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { LoginService } from './login.service';
import { UpdateHubService } from './update-hub.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private login: LoginService,
    private router: Router,
    private hub: UpdateHubService,
    private notificationService: NotificationService
  ) {}

  public async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const isLoggedIn = await this.login.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    } else {
      this.hub.start();
      this.notificationService.loadNotifications();
      return true;
    }
  }
}
