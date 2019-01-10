import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService, ICampaign } from 'src/app/campaign.service';
import { IEntityPreset } from 'src/app/entity.service';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'dd-campaign-settings',
  templateUrl: './campaign-settings.component.html',
  styleUrls: ['./campaign-settings.component.css'],
})
export class CampaignSettingsComponent implements OnInit {
  public saving = false;

  public expandXPTable = false;
  public expandItemRarityTable = false;

  public formGroup: FormGroup;

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute,
    private login: LoginService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.expandXPTable = !this.editing;
    if (
      this.campaign.experienceTable === undefined ||
      this.campaign.experienceTable === null
    ) {
      this.campaign.experienceTable = [];
    }
  }

  public selectEntityPreset(preset: IEntityPreset) {
    this.router.navigate(['../', 'entities', preset.id, 'edit'], {
      relativeTo: this.route,
    });
  }

  public async createEntityPreset() {
    this.router.navigate(['..', 'entities', 'create'], {
      relativeTo: this.route,
    });
  }

  public async save() {
    this.saving = true;

    if (this.editing) {
      try {
        const v = this.formGroup.value;

        const campaignUpdate: ICampaign = {
          name: v.name,
          description: v.description,
          imageId: v.imageId,
          experienceTable: v.experienceTable,
          userId: this.login.id,
          itemRarities: v.itemRarities,
          id: this.campaign.id,
        };

        await this.campaignService.updateCampaign(campaignUpdate);

        this.campaignService.campaign = { ...this.campaign, ...campaignUpdate };
      } catch (err) {
        console.log('SAVE ERR', err);
      }
    } else {
      const v = this.formGroup.value;

      try {
        const c = await this.campaignService.createCampaign({
          name: v.name,
          description: v.description,
          imageId: v.imageId,
          experienceTable: v.experienceTable,
          itemRarities: v.itemRarities,
          userId: this.login.id,
          id: '',
        });

        this.router.navigate(['campaign', 'manage', c.id, 'settings']);

        console.log('CREATE', c);
      } catch (err) {
        console.log('CREATE ERR', err, err.stack);
      }
    }

    this.saving = false;
  }

  public get campaign(): ICampaign {
    if (this.editing) {
      return this.campaignService.campaign;
    } else {
      return {
        id: '',
        name: '',
        description: '',
        imageId: '',
        userId: '',
        experienceTable: [],
      };
    }
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }
}
