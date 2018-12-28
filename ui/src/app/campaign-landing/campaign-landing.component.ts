import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'dd-campaign-landing',
  templateUrl: './campaign-landing.component.html',
  styleUrls: ['./campaign-landing.component.css'],
})
export class CampaignLandingComponent implements OnInit {
  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public get campaign() {
    return this.campaignService.campaign;
  }
}
