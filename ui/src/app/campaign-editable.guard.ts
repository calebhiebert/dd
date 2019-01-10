import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from './login.service';
import { CampaignService } from './campaign.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignEditableGuard implements CanActivate {
  constructor(private campaign: CampaignService, private login: LoginService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    await this.login.isLoggedIn();

    return this.campaign.canEdit;
  }
}
