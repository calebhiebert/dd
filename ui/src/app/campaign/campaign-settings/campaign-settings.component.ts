import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { EntityService } from 'src/app/entity.service';
import { EntityPreset } from 'src/app/entity';
import { RpcService } from 'src/app/rpc.service';
import { dd } from 'src/dd.pb';
import { FormGroup } from '@angular/forms';

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
    private route: ActivatedRoute,
    private rpc: RpcService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({});

    console.log(this.campaign, this.campaignCore);
  }

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
      const newCampaign: dd.ICampaignCore = {
        id: this.campaign.id,
        name: this.formGroup.value.name,
        description: this.formGroup.value.description,
        imageId: this.formGroup.value.imageId,
        experienceTable: this.formGroup.value.experienceTable || [1],
      };

      await this.rpc.dd.editCampaign({
        id: this.campaign.id,
        campaign: newCampaign,
      });
    } catch (err) {
      console.log('SAVE ERR', err);
    }

    this.saving = false;
  }

  public get campaignCore(): dd.ICampaignCore {
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
