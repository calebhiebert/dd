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
import { IEntity, EntityService } from '../entity.service';
import { EditableEntitySelectorComponent } from '../entity/editable-entity-selector/editable-entity-selector.component';
import { UpdateHubService } from '../update-hub.service';

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

const ENTITY_ICON_SIZE = 40;

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

  @ViewChild('entityselect')
  private entitySelect: EditableEntitySelectorComponent;

  private _map: IMap;
  private _notesLayerGroup: any;
  private _entityLayerGroups: { [key: string]: any } = {};
  private _mapLayerControl: any;
  private _notes: INote[];
  private _noteComponents: ComponentRef<NoteViewMiniComponent>[] = [];
  private _noteCreateSubscription: Subscription;
  private _noteDeleteSubscription: Subscription;
  private _noteUpdateSubscription: Subscription;
  private _entityUpdateSubscription: Subscription;

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
    private appRef: ApplicationRef,
    private entityService: EntityService,
    private updateHub: UpdateHubService
  ) {}

  ngAfterViewInit() {
    // The note service emits an event every time a note is created
    this._noteCreateSubscription = this.noteService.noteCreate
      .pipe(filter((n) => n.mapId === this._map.id))
      .subscribe((n) => {
        this.addNoteToMap(n);
      });

    // The note service emits an event every time a note is deleted
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

    // The note service emits an event every time a note is updated
    this._noteUpdateSubscription = this.noteService.noteUpdate
      .pipe(filter((n) => n.mapId === this._map.id))
      .subscribe((n) => {
        const noteLayer = this._notesLayerGroup
          .getLayers()
          .find((l) => l['_noteId'] === n.id);

        if (noteLayer === undefined) {
          this.addNoteToMap(n);
        }
      });

    // The updatehub service emits an event every time an entity is updated
    this._entityUpdateSubscription = this.updateHub.entityUpdated
      .pipe(filter((e) => e.mapId === this._map.id))
      .subscribe((e) => {
        if (!this._entityLayerGroups[e.preset.name]) {
          this.addEntityToMap(e);
          return;
        }

        const marker = this._entityLayerGroups[e.preset.name]
          .getLayers()
          .find((l) => l['_entity'].id === e.id);

        if (!marker) {
          this.addEntityToMap(e);
        } else {
          marker.setLatLng([e.lat, e.lng]);
        }
      });

    this.route.paramMap.subscribe((params) => {
      this.loadMap(params.get('m_id'));
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

    if (this._noteUpdateSubscription) {
      this._noteUpdateSubscription.unsubscribe();
    }

    if (this._entityUpdateSubscription) {
      this._entityUpdateSubscription.unsubscribe();
    }
  }

  private async loadMap(id: string) {
    await this.load(id);
    this.constructMap();
    this.createNotesLayer();
    await this.loadNotes(id);

    // Do entity setup
    // TODO move this into it's own function
    for (const entity of this.campaignService.campaign.entities) {
      if (entity.mapId === this._map.id && entity.lat && entity.lng) {
        this.addEntityToMap(entity);
      }
    }
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

  private createEntityLayer(name: string) {
    const layer = L.layerGroup();
    this._entityLayerGroups[name] = layer;
    layer.addTo(map);
    this._mapLayerControl.addOverlay(layer, name);
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

  private addEntityToMap(entity: IEntity) {
    if (entity.lat && entity.lng) {
      const marker = L.marker([entity.lat, entity.lng], {
        icon: L.icon({
          iconUrl: `https://res.cloudinary.com/dqhk8k6iv/image/upload/bo_1px_solid_rgb:000,c_lfill,g_faces:auto,h_${ENTITY_ICON_SIZE},r_${ENTITY_ICON_SIZE /
            2},w_${ENTITY_ICON_SIZE}/${entity.imageId}`,
          iconSize: [ENTITY_ICON_SIZE, ENTITY_ICON_SIZE],
          iconAnchor: [ENTITY_ICON_SIZE / 2, ENTITY_ICON_SIZE / 2],
        }),
      });

      marker['_entity'] = entity;

      if (!this._entityLayerGroups[entity.preset.name]) {
        this.createEntityLayer(entity.preset.name);
      }

      this._entityLayerGroups[entity.preset.name].addLayer(marker);
    }
  }

  private async handleEditorOperation(op: IMapEditorOperation, event: any) {
    switch (op.type) {
      case MapEditorOperationType.PLACE_NOTE:
        this.noteService.addNote({
          type: NoteType.MAP,
          mapId: this._map.id,
          lat: event.latlng.lat,
          lng: event.latlng.lng,
        });
        break;
      case MapEditorOperationType.UPDATE_ENTITY_POSITION:
        const entity = await this.entitySelect.selectEntity();
        if (entity) {
          await this.entityService.updateEntity({
            ...entity,
            mapId: this._map.id,
            lat: event.latlng.lat,
            lng: event.latlng.lng,
          });
        }
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
    this._notes = val;
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
