import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign/campaign.service';

@Component({
  selector: 'dd-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public get loadingCampaign() {
    return this.campaignService.loadingCampaign;
  }

  public get campaign() {
    return this.campaignService.campaign;
  }
}
