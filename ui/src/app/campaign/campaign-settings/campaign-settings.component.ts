import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { EntityService } from 'src/app/entity.service';
import { EntityPreset } from 'src/app/entity';
import { FormGroup } from '@angular/forms';
import { Campaign } from 'src/app/campaign';

@Component({
  selector: 'dd-campaign-settings',
  templateUrl: './campaign-settings.component.html',
  styleUrls: ['./campaign-settings.component.css'],
})
export class CampaignSettingsComponent implements OnInit {
  public creatingEntityPreset = false;

  public saving = false;

  public expandXPTable = false;

  public formGroup: FormGroup;

  constructor(
    private campaignService: CampaignService,
    private entityService: EntityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({});
  }

  public selectEntityPreset(preset: EntityPreset) {
    this.router.navigate(['../', 'entities', preset.id, 'edit'], {
      relativeTo: this.route,
    });
  }

  public async createEntityPreset() {
    this.creatingEntityPreset = true;

    try {
      this.router.navigate(['..', 'entities', '', 'edit'], {
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
      const newCampaign = {
        id: this.campaign.id,
        name: this.formGroup.value.name,
        description: this.formGroup.value.description,
        imageId: this.formGroup.value.imageId,
        experienceTable: this.formGroup.value.experienceTable || [1],
      };
    } catch (err) {
      console.log('SAVE ERR', err);
    }

    this.saving = false;
  }

  public get campaignCore(): any {
    return {
      name: this.campaign.name,
      description: this.campaign.description,
      imageId: this.campaign.imageId,
      id: this.campaign.id,
      experienceTable: this.campaign.experienceTable,
    };
  }

  public get campaign() {
    return this.campaignService.campaign;
  }
}
