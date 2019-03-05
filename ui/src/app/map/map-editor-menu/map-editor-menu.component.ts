import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/modal/modal.component';
import { CampaignService } from 'src/app/campaign.service';

export interface IMapEditorOperation {
  type: MapEditorOperationType;
}

export enum MapEditorOperationType {
  NONE,
  PLACE_NOTE,
  UPDATE_ENTITY_POSITION,
  LINK_ARTICLE,
  PLACE_SHAPELY_NOTE,
}

@Component({
  selector: 'dd-map-editor-menu',
  templateUrl: './map-editor-menu.component.html',
  styleUrls: ['./map-editor-menu.component.scss'],
})
export class MapEditorMenuComponent implements OnInit {
  @ViewChild('modal')
  private modal: ModalComponent<any>;

  private _opResolver: (op: IMapEditorOperation) => void;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public showMenu(): Promise<IMapEditorOperation> {
    const promise = new Promise<IMapEditorOperation>((resolve, reject) => {
      this._opResolver = resolve;
    });

    this.modal.open().then(() => {
      if (this._opResolver) {
        this._opResolver(null);
      }
    });

    return promise;
  }

  public placeNote() {
    this._opResolver({
      type: MapEditorOperationType.PLACE_NOTE,
    });
    this.modal.close(null);
  }

  public placeShapelyNote() {
    this._opResolver({
      type: MapEditorOperationType.PLACE_SHAPELY_NOTE,
    });
    this.modal.close(null);
  }

  public updateEntityPosition() {
    this._opResolver({
      type: MapEditorOperationType.UPDATE_ENTITY_POSITION,
    });
    this.modal.close(null);
  }

  public linkArticle() {
    this._opResolver({
      type: MapEditorOperationType.LINK_ARTICLE,
    });
    this.modal.close(null);
  }

  public get canUpdateEntityPosition() {
    return this.campaignService.editableEntities.length > 0;
  }

  public get campaignEditable() {
    return this.campaignService.canEdit;
  }
}
