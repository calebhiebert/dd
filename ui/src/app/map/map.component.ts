import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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

@Component({
  selector: 'dd-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map')
  private map: ElementRef<HTMLDivElement>;

  @ViewChild('editor')
  private editor: MapEditorMenuComponent;

  private _map: IMap;
  private _lMap: any;
  private _notes: INote[];

  public loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mapService: MapService,
    private campaignService: CampaignService,
    private noteService: NoteService
  ) {}

  ngAfterViewInit() {
    this.route.paramMap.subscribe((params) => {
      this.loadMap(params.get('m_id'));
    });
  }

  private async loadMap(id: string) {
    await this.load(id);
    this.constructMap();
    await this.loadNotes(id);
    this.addNotesToMap(this._notes);
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
    this._lMap = L.map(this.map.nativeElement, {
      crs: L.CRS.Simple,
      maxBounds: [[0, 0], [-256, 256]],
    });

    this._lMap.on('contextmenu', (e) => {
      this.editor.showMenu().then((operation) => {
        if (operation != null) {
          this.handleEditorOperation(operation, e);
        }
      });
    });

    this._lMap.setView([0, 0], 1);

    L.tileLayer(`${environment.tileURL}/maps/{id}/tile/{z}/{x}/{y}`, {
      maxZoom: this._map.maxZoom,
      minZoom: this._map.minZoom,
      bounds: [[0, 0], [-256, 256]],
      id: this._map.id,
    }).addTo(this._lMap);
  }

  private addNotesToMap(notes: INote[]) {
    for (const note of notes) {
      if (note.lat && note.lng) {
        const marker = L.marker([note.lat, note.lng]).addTo(this._lMap);
        marker.on('click', () => {
          this.noteService.editNote(note);
        });
      }
    }
  }

  private handleEditorOperation(op: IMapEditorOperation, event: any) {
    console.log(event);

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
    if (await Swal.fire({ title: 'Are you sure?', showCancelButton: true })) {
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

  public get editable() {
    return this.campaignService.canEdit;
  }
}
