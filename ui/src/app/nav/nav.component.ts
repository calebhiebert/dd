import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dd-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private campaignService: CampaignService,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit() {}

  public logOut() {
    this.login.logout();
    this.router.navigate(['login']);
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
}
