import { Component, OnInit, Input } from '@angular/core';
import { IEntity, EntityService } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'dd-entity-view-mini',
  templateUrl: './entity-view-mini.component.html',
  styleUrls: ['./entity-view-mini.component.css'],
})
export class EntityViewMiniComponent implements OnInit {
  @Input()
  public entity: IEntity;

  public removing = false;

  constructor(
    private campaignService: CampaignService,
    private login: LoginService,
    private router: Router,
    private entityService: EntityService
  ) {}

  ngOnInit() {}

  public viewMore() {
    this.router.navigate([
      'campaigns',
      this.entity.campaignId,
      'entities',
      this.entity.id,
    ]);
  }

  public async removeFromMap() {
    this.removing = true;

    try {
      await this.entityService.updateEntity({
        ...this.entity,
        mapId: null,
        lat: null,
        lng: null,
      });
    } catch (err) {
      throw err;
    }

    this.removing = false;
  }

  public get editable() {
    return this.entity.userId === this.login.id || this.campaignService.canEdit;
  }

  public get level() {
    if (this.entity && this.entity.preset && this.entity.preset.isXPEnabled) {
      return this.campaignService.calculateLevel(this.entity.xp);
    } else {
      return null;
    }
  }

  public get user() {
    return this.campaignService.campaign.members.find(
      (m) => m.userId === this.entity.userId
    ).user;
  }
}
