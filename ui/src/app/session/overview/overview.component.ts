import { Component, OnInit } from '@angular/core';
import { CampaignService, ICampaign } from 'src/app/campaign.service';
import { IEntity } from 'src/app/entity.service';
import { OverviewService } from 'src/app/overview.service';

@Component({
  selector: 'dd-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  constructor(
    private campaignService: CampaignService,
    private overviewService: OverviewService
  ) {}

  ngOnInit() {}

  public trackEntityElement(idx: number, ent: IEntity) {
    return ent.id;
  }

  public get campaign(): ICampaign {
    return this.campaign;
  }

  public get sortedEntities(): IEntity[] {
    return this.overviewService.sortedEntities;
  }
}
