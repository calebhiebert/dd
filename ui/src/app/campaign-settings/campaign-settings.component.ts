import { Component, OnInit } from '@angular/core';
import { EntityAttribute, EntityPreset } from '../entity';
import { AttributeType } from '../attributes';
import { CampaignService } from '../campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityService } from '../entity.service';

@Component({
  selector: 'dd-campaign-settings',
  templateUrl: './campaign-settings.component.html',
  styleUrls: ['./campaign-settings.component.css'],
})
export class CampaignSettingsComponent implements OnInit {
  public creatingEntityPreset = false;

  public saving = false;

  public expandXPTable = false;

  constructor(
    private campaignService: CampaignService,
    private entityService: EntityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  public selectEntityPreset(preset: EntityPreset) {
    this.router.navigate(['../', 'entities', preset.id, 'edit'], {
      relativeTo: this.route,
    });
  }

  public async createEntityPreset() {
    this.creatingEntityPreset = true;

    try {
      const id = await this.entityService.createEntityPreset();
      this.router.navigate(['..', 'entities', id, 'edit'], {
        relativeTo: this.route,
      });
    } catch (err) {
      console.log('CREATE ERR', err);
    }

    this.creatingEntityPreset = false;
  }

  public async save() {
    this.saving = true;

    try {
      const newCampaign = { ...this.campaign };

      await this.campaignService.saveCampaign(newCampaign);
    } catch (err) {
      console.log('SAVE ERR', err);
    }

    this.saving = false;
  }

  public get campaign() {
    return this.campaignService.campaign;
  }

  public imageSource(id: string): string {
    return `https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/${id}.png`;
  }
}
