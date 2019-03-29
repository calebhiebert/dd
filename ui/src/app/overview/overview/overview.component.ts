import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService, ICampaign } from 'src/app/campaign.service';
import { IEntity } from 'src/app/entity.service';
import { OverviewService } from 'src/app/overview.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ModalComponent } from 'src/app/custom-controls/modal/modal.component';
import { IDynamicFieldConfig, DynamicFieldType } from 'src/app/custom-controls/dynform/form-types';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'dd-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  public loading = false;

  public labelControl: FormControl;

  @ViewChild('labelmodal')
  private _labelModal: ModalComponent<string>;

  constructor(private campaignService: CampaignService, private overviewService: OverviewService) {}

  ngOnInit() {
    this.labelControl = new FormControl(null);

    this.overviewService.loadOverviewState();
  }

  public trackEntityElement(idx: number, ent: IEntity) {
    return ent.id;
  }

  public entityDropped(evt: CdkDragDrop<any>) {
    this.overviewService.swapEntities(evt.previousIndex, evt.currentIndex);
  }

  public async editLabel(entity: IEntity) {
    if (this.labels && this.labels[entity.id]) {
      this.labelControl.setValue(this.labels[entity.id]);
    }

    const label = await this._labelModal.open();
    this.labelControl.setValue(null);

    if (label === 'clear-label') {
      this.overviewService.setLabel(entity, null);
      return;
    }

    if (label) {
      this.overviewService.setLabel(entity, label);
    }
  }

  public get campaign(): ICampaign {
    return this.campaign;
  }

  public get editable(): boolean {
    return this.campaignService.canEdit;
  }

  public get sortedEntities(): IEntity[] {
    return this.overviewService.sortedEntities;
  }

  public get state() {
    return this.overviewService.state;
  }

  public get reorderable() {
    return this.overviewService.reorderable;
  }

  public get labels() {
    return this.state && this.state.entityLabels;
  }

  public get labelFieldConfig(): IDynamicFieldConfig {
    return {
      name: 'Label',
      description: 'A label that will show up in the overview screen',
      type: DynamicFieldType.STRING,
      options: {
        required: false,
        maxLength: 8,
      },
    };
  }
}
