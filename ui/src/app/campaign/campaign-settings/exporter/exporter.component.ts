import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CampaignService } from 'src/app/campaign.service';
import { IConceptType } from 'src/app/concept.service';
import { ModalComponent } from 'src/app/custom-controls/modal/modal.component';

@Component({
  selector: 'dd-exporter',
  templateUrl: './exporter.component.html',
  styleUrls: ['./exporter.component.css'],
})
export class ExporterComponent implements OnInit {
  public formGroup: FormGroup;

  @ViewChild('modal', { static: true })
  private modal: ModalComponent<any>;

  @Input()
  public set conceptTypes(value: IConceptType[]) {
    this._conceptTypes = value;
    this.ngOnInit();
  }

  private _conceptTypes: IConceptType[];

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      exportQuests: new FormControl(true),
      exportArticles: new FormControl(true),
      exportEntityPresets: new FormControl(true),
    });

    for (const ct of this.conceptTypes) {
      this.formGroup.addControl(`ct-${ct.id}`, new FormControl(true));
    }
  }

  public doExport() {
    this.modal.open();
  }

  public get exportLink() {
    let link = `${environment.apiURL}/export?campaignId=${this.campaignService.campaign.id}`;

    const v = this.formGroup.value;

    if (v.exportQuests) {
      link += '&quests=true';
    }

    if (v.exportArticles) {
      link += '&articles=true';
    }

    if (v.exportEntityPresets) {
      link += '&entitypresets=true';
    }

    for (const ct of this.conceptTypes) {
      if (this.formGroup.get(`ct-${ct.id}`).value === true) {
        link += `&conceptType=${ct.id}`;
      }
    }

    return link;
  }

  public get conceptTypes() {
    return this._conceptTypes;
  }
}
