import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService, ICampaign } from 'src/app/campaign.service';
import { IEntity } from 'src/app/entity.service';
import { OverviewService } from 'src/app/overview.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ModalComponent } from 'src/app/custom-controls/modal/modal.component';
import { IDynamicFieldConfig, DynamicFieldType } from 'src/app/custom-controls/dynform/form-types';
import { FormControl } from '@angular/forms';
import { ISelectOption, SelectorPopupComponent } from 'src/app/custom-controls/selector-popup/selector-popup.component';
import { ConceptService, IConceptType, IConcept } from 'src/app/concept.service';

@Component({
  selector: 'dd-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  public loading = false;

  public labelControl: FormControl;

  public loadConcepts: (search: string) => Promise<ISelectOption[]>;

  @ViewChild('labelmodal')
  private _labelModal: ModalComponent<string>;

  @ViewChild('conceptselector')
  private _conceptSelector: SelectorPopupComponent;
  private _addingConceptType: IConceptType;

  constructor(private campaignService: CampaignService, private overviewService: OverviewService, private conceptService: ConceptService) {}

  ngOnInit() {
    this.labelControl = new FormControl(null);

    this.overviewService.loadOverviewState();

    this.loadConcepts = async (search: string) => {
      if (!this._addingConceptType) {
        return;
      }

      const concepts = await this.conceptService.getConcepts(this._addingConceptType.id, 6, 0, search);
      return concepts.concepts.map((c) => ({
        displayHtml: c.name,
        value: c,
      }));
    };
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

  public async addConceptTypeToEntity(conceptType: IConceptType, entity: IEntity) {
    this._addingConceptType = conceptType;

    const concept: IConcept = await this._conceptSelector.openSelector();

    this._addingConceptType = null;
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
