import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from 'src/app/campaign.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { IEntity } from 'src/app/entity.service';

@Component({
  selector: 'dd-editable-entity-selector',
  templateUrl: './editable-entity-selector.component.html',
  styleUrls: ['./editable-entity-selector.component.css']
})
export class EditableEntitySelectorComponent implements OnInit {
  @ViewChild('modal')
  public modal: ModalComponent<IEntity>;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public choose(entity: IEntity) {
    this.modal.close(entity);
  }

  public selectEntity(): Promise<IEntity | null> {
    return this.modal.open();
  }

  public get entities() {
    return this.campaignService.editableEntities;
  }
}
