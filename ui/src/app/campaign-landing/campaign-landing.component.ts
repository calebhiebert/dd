import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { Entity } from '../entity';

@Component({
  selector: 'dd-campaign-landing',
  templateUrl: './campaign-landing.component.html',
  styleUrls: ['./campaign-landing.component.scss'],
})
export class CampaignLandingComponent implements OnInit {
  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public userEntities(id: string) {
    return this.campaign.entities.filter((e) => e.user.id === id);
  }

  public selectEntity(entity: Entity) {
    console.log(entity);
  }

  public get campaign() {
    return this.campaignService.campaign;
  }

  public imageSource(id: string): string {
    return `https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/${id}.png`;
  }
}
