import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/campaign';
import { CampaignService } from 'src/app/campaign.service';
import { RpcService } from 'src/app/rpc.service';

@Component({
  selector: 'dd-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
})
export class CampaignListComponent implements OnInit {
  public loading = false;
  public creating = false;
  public campaigns: Campaign[] = null;

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private rpc: RpcService
  ) {}

  ngOnInit() {
    this.loadCampaigns();
  }

  public async createCampaign() {
    this.creating = true;

    try {
      const res = await this.rpc.dd.createCampaign({});
      this.router.navigate(['campaign', 'manage', res.id, 'settings']);
    } catch (err) {
      console.log('CREATE ERR', err);
    }

    this.creating = false;
  }

  public selectCampaign(campaign: Campaign) {
    this.campaignService.setSelection(campaign.id);
    this.router.navigate(['campaigns', campaign.id]);
  }

  private async loadCampaigns() {
    this.loading = true;
    try {
      const campaigns = await this.campaignService.getCampaigns();
      this.campaigns = campaigns;
    } catch (err) {
      console.log('ERR', err);
    }

    this.loading = false;
  }
}
