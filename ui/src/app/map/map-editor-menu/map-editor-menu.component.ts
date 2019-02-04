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
    const promise = new Promise((resolve, reject) => {
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
    this._opResolver({});
    this.modal.close(null);
  }
}

export interface IMapEditorOperation {}
