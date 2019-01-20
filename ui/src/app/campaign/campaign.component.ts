import { Component, OnInit, OnDestroy } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dd-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
})
export class CampaignComponent implements OnInit, OnDestroy {
  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (!this.loading && !this.campaign) {
      this.route.params.subscribe((params) => {
        this.campaignService.setSelection(params.id);
      });
    }
  }

  ngOnDestroy(): void {
    this.campaignService.setSelection(null);
  }

  public get loading() {
    return this.campaignService.loadingCampaign;
  }

  public get campaign() {
    return this.campaignService.campaign;
  }
}
