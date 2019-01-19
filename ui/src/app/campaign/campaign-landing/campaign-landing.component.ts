import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { IEntityPreset, IEntity } from 'src/app/entity.service';

@Component({
  selector: 'dd-campaign-landing',
  templateUrl: './campaign-landing.component.html',
  styleUrls: ['./campaign-landing.component.scss'],
})
export class CampaignLandingComponent implements OnInit {
  @ViewChild('invites')
  public invites: ModalComponent<boolean>;

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  public userEntities(id: string) {
    return this.campaign.entities.filter((e) => e.user && e.user.id === id);
  }

  public selectEntity(entity: IEntity) {
    this.router.navigate(['..', 'entities', entity.id], {
      relativeTo: this.route,
    });
  }

  public manageQuests() {
    this.router.navigate(['campaigns', this.campaign.id, 'quests']);
  }

  public get campaign() {
    return this.campaignService.campaign;
  }

  public get editable() {
    return this.campaignService.canEdit;
  }

  public get entityPresets(): IEntityPreset[] {
    return this.campaign.entityPresets.filter((e) => e.playerCreatable);
  }
}
