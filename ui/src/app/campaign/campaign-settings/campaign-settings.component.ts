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
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IConceptType } from 'src/app/concept.service';
import { IconService } from 'src/app/icon.service';

@Component({
  selector: 'dd-campaign-settings',
  templateUrl: './campaign-settings.component.html',
  styleUrls: ['./campaign-settings.component.css'],
})
export class CampaignSettingsComponent implements OnInit, ComponentCanDeactivate {
  public saving = false;
  public deleting = false;
  public importing = false;

  public expandXPTable = false;
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
    private toast: ToastrService,
    private http: HttpClient,
    private iconService: IconService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.expandXPTable = !this.editing;
    this.expandCurrencyMapEditor = !this.editing;

    if (this.campaign.experienceTable === undefined || this.campaign.experienceTable === null) {
      this.campaign.experienceTable = [];
    }

    if (this.route.snapshot.queryParamMap.get('refresh') === 'true') {
      this.campaignService.refreshCurrentCampaign();
      this.router.navigate([], { replaceUrl: true });
    }
  }

  public canDeactivate() {
    return !this.formGroup.dirty;
  }

  public selectEntityPreset(preset: IEntityPreset) {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'entitytypes', preset.id, 'edit']);
  }

  public selectConceptType(conceptType: IConceptType) {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'concepttypes', conceptType.id, 'edit']);
  }

  public async createEntityPreset() {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'entitytypes', 'create']);
  }

  public createConceptType() {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'concepttypes', 'create']);
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
          currencyMap: v.currencyMap,
          trackCoins: v.trackCoins,
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
          currencyMap: v.currencyMap,
          trackCoins: v.trackCoins,
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
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will completely delete this campaign and everything that goes along with it. This cannot be undone!',
      showCancelButton: true,
      cancelButtonText: 'Back to safety',
      confirmButtonText: '☢️ Nuke It',
    });

    if (!confirmation.value) {
      return;
    }

    this.deleting = true;

    try {
      await this.campaignService.deleteCampaign(this.campaign);
    } catch (err) {
      throw err;
    }

    this.deleting = false;
    this.router.navigate(['home']);
  }

  public export() {
    this.exporter.doExport();
  }

  public async import(evt) {
    const file: File = evt.target.files[0];

    const validType = ['application/zip', 'application/x-zip-compressed', 'multipart/x-zip'].indexOf(file.type) !== -1;

    if (!validType) {
      Swal.fire({
        type: 'error',
        title: 'Invalid File Type!',
        text: 'File should be a zip file created from an export',
      });
      return;
    }

    this.importing = true;

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('campaignId', this.campaignService.campaign.id);

      this.http.post(`${environment.apiURL}/import`, formData).subscribe(
        (res) => {
          const { articles, entityPresets, quests, concepts, conceptTypes } = res as any;
          this.importing = false;
          Swal.fire({
            title: 'All Done!',
            // tslint:disable-next-line:max-line-length
            html: `All done importing the things. Here's how it went:<br/>Articles: ${articles}<br/>Entity Types: ${entityPresets}<br/>Concepts: ${concepts}<br/>Quests: ${quests}<br/>ConceptTypes: ${conceptTypes}`,
          }).then(() => this.campaignService.refreshCurrentCampaign());
        },
        (err) => {
          Swal.fire({
            type: 'error',
            title: 'Hmm...',
            text: 'Something went wrong during import. Please try again',
          });
          throw err;
        }
      );
    } catch (err) {
      throw err;
    }
  }

  public getIcon(icon: string) {
    return this.iconService.getIconSrc(icon);
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

  public get loading() {
    return this.campaignService.loadingCampaign;
  }
}
