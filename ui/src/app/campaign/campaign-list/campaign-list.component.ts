import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService, ICampaign } from 'src/app/campaign.service';
import { IEntityPreset } from 'src/app/entity.service';

@Component({
  selector: 'dd-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
})
export class CampaignListComponent implements OnInit {
  public loading = false;
  public creating = false;
  public campaigns: ICampaign[] = null;

  constructor(
    private campaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCampaigns();
  }

  private async loadCampaigns() {
    this.loading = true;
    try {
      const campaigns = await this.campaignService.getCampaigns();
      this.campaigns = campaigns;
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public async createCampaign() {
    this.router.navigate(['campaigns', 'create']);
  }

  public selectCampaign(campaign: ICampaign) {
    this.campaignService.setSelection(campaign.id);
    this.router.navigate(['campaigns', campaign.id]);
  }
}
