import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'dd-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private campaignService: CampaignService,
    private login: LoginService,
    private sidebar: SidebarService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  public toggle() {
    this.sidebar.toggle();
  }

  public get loadingCampaign() {
    return this.campaignService.loadingCampaign;
  }

  public get campaign() {
    return this.campaignService.campaign;
  }

  public get loggedIn() {
    return this.login.loggedIn;
  }

  public get loginInProgress() {
    return this.login.loginInProgress;
  }

  public get notificationText() {
    if (!this.notificationService.notifications) {
      return '...';
    } else {
      return this.notificationService.notifications.length;
    }
  }
}
