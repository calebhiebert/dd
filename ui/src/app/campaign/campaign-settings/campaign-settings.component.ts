import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService, ICampaign } from 'src/app/campaign.service';
import { IEntityPreset } from 'src/app/entity.service';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/login.service';
import { ToastrService } from 'ngx-toastr';
import { ComponentCanDeactivate } from 'src/app/unsaved-changes.guard';
import { ExporterComponent } from './exporter/exporter.component';

@Component({
  selector: 'dd-campaign-settings',
  templateUrl: './campaign-settings.component.html',
  styleUrls: ['./campaign-settings.component.css'],
})
export class CampaignSettingsComponent
  implements OnInit, ComponentCanDeactivate {
  public saving = false;

  public expandXPTable = false;
  public expandItemRarityTable = false;
  public expandCurrencyMapEditor = false;

  public formGroup: FormGroup;

  @ViewChild('exporter')
  private exporter: ExporterComponent;

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute,
    private login: LoginService,
    private location: Location,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.expandXPTable = !this.editing;
    this.expandCurrencyMapEditor = !this.editing;
    this.expandItemRarityTable = !this.editing;
    if (
      this.campaign.experienceTable === undefined ||
      this.campaign.experienceTable === null
    ) {
      this.campaign.experienceTable = [];
    }
  }

  canDeactivate() {
    return !this.formGroup.dirty;
  }

  public selectEntityPreset(preset: IEntityPreset) {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'entitytypes',
      preset.id,
      'edit',
    ]);
  }

  public async createEntityPreset() {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'entitytypes',
      'create',
    ]);
  }

  public async save() {
    this.saving = true;

    if (this.editing) {
      try {
        const v = this.formGroup.value;

        const campaignUpdate: ICampaign = {
          name: v.name,
          content: v.content,
          imageId: v.imageId,
          experienceTable: v.experienceTable,
          userId: this.login.id,
          itemRarities: v.itemRarities,
          currencyMap: v.currencyMap,
          id: this.campaign.id,
        };

        await this.campaignService.updateCampaign(campaignUpdate);
        this.campaignService.campaign = { ...this.campaign, ...campaignUpdate };
        this.formGroup.markAsPristine();
      } catch (err) {
        throw err;
      }

      this.toast.info('Campaign settings updated');
    } else {
      const v = this.formGroup.value;

      try {
        const c = await this.campaignService.createCampaign({
          name: v.name,
          content: v.content,
          imageId: v.imageId,
          experienceTable: v.experienceTable,
          itemRarities: v.itemRarities,
          currencyMap: v.currencyMap,
          userId: this.login.id,
          id: '',
        });

        this.router.navigate(['campaigns', c.id, 'settings']);
      } catch (err) {
        throw err;
      }
    }

    this.saving = false;
  }

  public cancel() {
    this.location.back();
  }

  public async delete() {
    // TODO add delete logic
  }

  public export() {
    this.exporter.doExport();
  }

  public get campaign(): ICampaign {
    if (this.editing) {
      return this.campaignService.campaign;
    } else {
      return {
        id: '',
        name: '',
        content: null,
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
