import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { UpdateHubService } from '../update-hub.service';

@Component({
  selector: 'dd-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.css'],
})
export class NavSidebarComponent implements OnInit {
  constructor(
    private campaignService: CampaignService,
    private login: LoginService,
    private router: Router,
    private hub: UpdateHubService
  ) {}

  ngOnInit() {}

  public logOut() {
    this.login.logout();
    this.router.navigate(['login']);
    this.campaignService.campaign = undefined;
  }

  public get entityPresets() {
    if (!this.campaign) {
      return;
    }

    if (this.campaignService.canEdit) {
      return this.campaign.entityPresets;
    } else {
      return this.campaign.entityPresets.filter((ep) => ep.playerCreatable);
    }
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

  public get campaignEditable() {
    return this.campaignService.canEdit;
  }

  public get connectionStatus() {
    return this.hub.state;
  }
}
