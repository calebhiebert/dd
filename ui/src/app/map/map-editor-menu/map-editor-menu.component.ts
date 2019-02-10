import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/modal/modal.component';
import { IPromise } from 'q';

@Component({
  selector: 'dd-map-editor-menu',
  templateUrl: './map-editor-menu.component.html',
  styleUrls: ['./map-editor-menu.component.scss'],
})
export class MapEditorMenuComponent implements OnInit {
  @ViewChild('modal')
  private modal: ModalComponent<any>;

  private _opResolver: (op: IMapEditorOperation) => void;

  constructor() {}

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

  public placeMarker() {
    this._opResolver({
      type: MapEditorOperationType.NONE,
    });
    this.modal.close(null);
  }

  public placeNote() {
    this._opResolver({
      type: MapEditorOperationType.PLACE_NOTE,
    });
    this.modal.close(null);
  }
}

export interface IMapEditorOperation {
  type: MapEditorOperationType;
}

export enum MapEditorOperationType {
  NONE,
  PLACE_NOTE,
}
