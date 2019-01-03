import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { Entity } from '../entity';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dd-campaign-landing',
  templateUrl: './campaign-landing.component.html',
  styleUrls: ['./campaign-landing.component.scss'],
})
export class CampaignLandingComponent implements OnInit {
  constructor(private campaignService: CampaignService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  public userEntities(id: string) {
    return this.campaign.entities.filter((e) => e.user.id === id);
  }

  public selectEntity(entity: Entity) {
    this.router.navigate(['..', 'entities', entity.id], { relativeTo: this.route });
  }

  public get campaign() {
    return this.campaignService.campaign;
  }
}
