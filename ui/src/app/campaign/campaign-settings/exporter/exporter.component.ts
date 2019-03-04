import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/modal/modal.component';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-exporter',
  templateUrl: './exporter.component.html',
  styleUrls: ['./exporter.component.css'],
})
export class ExporterComponent implements OnInit {
  public formGroup: FormGroup;

  @ViewChild('modal')
  private modal: ModalComponent<any>;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      exportItems: new FormControl(true),
      exportSpells: new FormControl(true),
      exportQuests: new FormControl(true),
      exportArticles: new FormControl(true),
      exportEntityPresets: new FormControl(true),
    });
  }

  public doExport() {
    this.modal.open();
  }

  public get exportLink() {
    let link = `${environment.apiURL}/export?campaignId=${
      this.campaignService.campaign.id
    }`;

    const v = this.formGroup.value;

    if (v.exportItems) {
      link += '&items=true';
    }

    if (v.exportSpells) {
      link += '&spells=true';
    }

    if (v.exportQuests) {
      link += '&quests=true';
    }

    if (v.exportArticles) {
      link += '&articles=true';
    }

    if (v.exportEntityPresets) {
      link += '&entitypresets=true';
    }

    return link;
  }
}
