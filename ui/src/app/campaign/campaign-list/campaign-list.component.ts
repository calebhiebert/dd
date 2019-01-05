import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/campaign';
import { CampaignService } from 'src/app/campaign.service';
import { RpcService } from 'src/app/rpc.service';
import { dd } from 'src/dd.pb';

@Component({
  selector: 'dd-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
})
export class CampaignListComponent implements OnInit {
  public loading = false;
  public creating = false;
  public campaigns: dd.ICampaignCore[] = null;

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
      const campaignResult = await this.rpc.dd.getCampaigns({});
      this.campaigns = campaignResult.campaigns;
    } catch (err) {
      console.log('ERR', err);
    }

    this.loading = false;
  }
}
