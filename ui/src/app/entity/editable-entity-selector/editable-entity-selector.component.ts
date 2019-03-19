import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from 'src/app/campaign.service';
import { IEntity } from 'src/app/entity.service';
import { ModalComponent } from 'src/app/custom-controls/modal/modal.component';

@Component({
  selector: 'dd-editable-entity-selector',
  templateUrl: './editable-entity-selector.component.html',
  styleUrls: ['./editable-entity-selector.component.css'],
})
export class EditableEntitySelectorComponent implements OnInit {
  @ViewChild('modal')
  public modal: ModalComponent<IEntity>;

  private _entityOverride: IEntity[];

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public choose(entity: IEntity) {
    this.modal.close(entity);
  }

  public selectEntity(overrideEntityList?: IEntity[]): Promise<IEntity | null> {
    this._entityOverride = overrideEntityList;

    return this.modal.open().then((entity) => {
      this._entityOverride = undefined;
      return entity;
    });
  }

  public get entities() {
    if (this._entityOverride) {
      return this._entityOverride;
    } else {
      return this.campaignService.editableEntities.slice().filter((e) => e.spawnable === false);
    }
  }
}
