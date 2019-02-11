import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  EmbeddedViewRef,
  ComponentRef,
  OnDestroy,
} from '@angular/core';
import L from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MapService, IMap } from '../map.service';
import {
  MapEditorMenuComponent,
  IMapEditorOperation,
  MapEditorOperationType,
} from './map-editor-menu/map-editor-menu.component';
import { CampaignService } from '../campaign.service';
import Swal from 'sweetalert2';
import { NoteService, NoteType, INote } from '../note.service';
import { filter } from 'rxjs/operators';
import { LoginService } from '../login.service';
import { NoteViewMiniComponent } from '../note/note-view-mini/note-view-mini.component';
import { Subscription } from 'rxjs';

let ownNoteIcon = L.icon({
  iconUrl: '/assets/note-icon.png',

  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
});

let otherNoteIcon = L.icon({
  iconUrl: '/assets/note-icon-2.png',

  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
});

let map: any;

@Component({
  selector: 'dd-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  private map: ElementRef<HTMLDivElement>;

  @ViewChild('editor')
  private editor: MapEditorMenuComponent;

  private _map: IMap;
  private _notesLayerGroup: any;
  private _mapLayerControl: any;
  private _notes: INote[];
  private _noteComponents: ComponentRef<NoteViewMiniComponent>[] = [];
  private _noteCreateSubscription: Subscription;
  private _noteDeleteSubscription: Subscription;

  public loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mapService: MapService,
    private campaignService: CampaignService,
    private noteService: NoteService,
    private login: LoginService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  ngAfterViewInit() {
    this.route.paramMap.subscribe((params) => {
      this.loadMap(params.get('m_id'));
    });

    this._noteCreateSubscription = this.noteService.noteCreate
      .pipe(filter((n) => n.mapId === this._map.id))
      .subscribe((n) => {
        this.addNoteToMap(n);
      });

    this._noteDeleteSubscription = this.noteService.noteDelete
      .pipe(filter((n) => n.mapId === this._map.id))
      .subscribe((n) => {
        for (const layer of this._notesLayerGroup.getLayers()) {
          if (layer['_noteId'] === n.id) {
            const popupComponent: ComponentRef<NoteViewMiniComponent> =
              layer['_noteComponent'];

            this._noteComponents = this._noteComponents.filter(
              (nc) => nc !== popupComponent
            );

            popupComponent.destroy();
            this._notesLayerGroup.removeLayer(layer);
          }
        }
      });
  }

  ngOnDestroy() {
    for (const nc of this._noteComponents) {
      nc.destroy();
    }

    if (this._noteCreateSubscription) {
      this._noteCreateSubscription.unsubscribe();
    }

    if (this._noteDeleteSubscription) {
      this._noteDeleteSubscription.unsubscribe();
    }
  }

  private async loadMap(id: string) {
    await this.load(id);
    this.constructMap();
    this.createNotesLayer();
    await this.loadNotes(id);
  }

  private async load(id: string) {
    this.loading = true;

    try {
      this._map = await this.mapService.getMap(id);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  private async loadNotes(mapId: string) {
    try {
      this._notes = await this.noteService.getNotes(
        this.campaignService.campaign.id,
        {
          mapId: mapId,
        }
      );
    } catch (err) {
      throw err;
    }
  }

  private constructMap() {
    map = L.map(this.map.nativeElement, {
      crs: L.CRS.Simple,
      maxBounds: [[0, 0], [-256, 256]],
      zoomSnap: 0.25,
    });

    map.on('contextmenu', (e) => {
      this.editor.showMenu().then((operation) => {
        if (operation != null) {
          this.handleEditorOperation(operation, e);
        }
      });
    });

    const tileLayer = L.tileLayer(
      `${environment.tileURL}/maps/{id}/tile/{z}/{x}/{y}`,
      {
        maxZoom: this._map.maxZoom + 2,
        minZoom: this._map.minZoom,
        minNativeZoom: 1,
        maxNativeZoom: this._map.maxZoom,
        bounds: [[0, 0], [-256, 256]],
        id: this._map.id,
      }
    ).addTo(map);

    this._mapLayerControl = L.control.layers().addTo(map);
    this._mapLayerControl.addBaseLayer(tileLayer, 'Base');

    map.fitBounds([[-10, 10], [-246, 246]]);
  }

  private createNotesLayer() {
    this._notesLayerGroup = L.layerGroup();
    this._notesLayerGroup.addTo(map);
    this._mapLayerControl.addOverlay(this._notesLayerGroup, 'Notes');
  }

  private addNoteToMap(note: INote) {
    if (note.lat && note.lng) {
      const isNoteMine = note.userId === this.login.id;

      const marker = L.marker([note.lat, note.lng], {
        icon: isNoteMine ? ownNoteIcon : otherNoteIcon,
      });

      marker['_noteId'] = note.id;

      const component = this.resolver
        .resolveComponentFactory(NoteViewMiniComponent)
        .create(this.injector);
      component.instance.note = note;

      this._noteComponents.push(component);
      marker['_noteComponent'] = component;

      this.appRef.attachView(component.hostView);

      const popup = L.popup({
        minWidth: 150,
      });

      popup.setContent((component.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement);

      marker.bindPopup(popup);

      this._notesLayerGroup.addLayer(marker);
    }
  }

  private handleEditorOperation(op: IMapEditorOperation, event: any) {
    switch (op.type) {
      case MapEditorOperationType.PLACE_NOTE:
        this.noteService.addNote({
          type: NoteType.MAP,
          mapId: this._map.id,
          lat: event.latlng.lat,
          lng: event.latlng.lng,
        });
        break;
    }
  }

  public async delete() {
    if (
      (await Swal.fire({ title: 'Are you sure?', showCancelButton: true }))
        .value === true
    ) {
      try {
        await this.mapService.deleteMap(this._map.id);
        this.router.navigate([
          'campaigns',
          this.campaignService.campaign.id,
          'maps',
        ]);
      } catch (err) {
        throw err;
      }
    }
  }

  public get notes() {
    return this._notes;
  }

  public set notes(val: INote[]) {
    console.log(map);
    this._notes = val;
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
