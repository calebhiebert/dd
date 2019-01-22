import { Component, OnInit } from '@angular/core';
import { CampaignService, ICampaign } from 'src/app/campaign.service';
import { IEntity } from 'src/app/entity.service';

@Component({
  selector: 'dd-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public trackEntityElement(idx: number, ent: IEntity) {
    return ent.id;
  }

  public get campaign(): ICampaign {
    return this.campaign;
  }

  public get entities(): IEntity[] {
    return this.campaignService.campaign.entities.filter((e) => !e.spawnable);
  }
}
