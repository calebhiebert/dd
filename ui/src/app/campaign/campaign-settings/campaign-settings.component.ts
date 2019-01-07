import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService, ICampaign } from 'src/app/campaign.service';
import { EntityService } from 'src/app/entity.service';
import { EntityPreset } from 'src/app/entity';
import { FormGroup } from '@angular/forms';
import { Campaign } from 'src/app/campaign';
import { LoginService } from 'src/app/login.service';

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
    private login: LoginService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.expandXPTable = !this.editing;
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

    if (this.editing) {
      try {
        const v = this.formGroup.value;

        const c = await this.campaignService.updateCampaign({
          name: v.name,
          description: v.description,
          imageId: v.imageId,
          experienceTable: v.experienceTable,
          userId: this.login.id,
          id: this.campaign.id,
        });

        // this.campaignService.campaign = c;
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
          userId: this.login.id,
          id: '',
        });

        this.router.navigate(['campaigns', 'manage', c.id, 'settings']);

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
