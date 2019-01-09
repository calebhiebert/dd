import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { CampaignService } from './campaign.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignEditableGuard implements CanActivate {
  constructor(private campaign: CampaignService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.campaign.canEdit;
  }
}
