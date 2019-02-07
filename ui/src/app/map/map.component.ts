import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import Leaflet from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MapService, IMap } from '../map.service';
import { MapEditorMenuComponent } from './map-editor-menu/map-editor-menu.component';
import { CampaignService } from '../campaign.service';

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

  public loading = false;

  constructor(
    private route: ActivatedRoute,
    private mapService: MapService,
    private campaignService: CampaignService
  ) {}

  ngAfterViewInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.loadMap(params.get('m_id'));
    });
  }

  private async loadMap(id: string) {
    await this.load(id);
    this.constructMap();
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

  private constructMap() {
    const map = Leaflet.map(this.map.nativeElement, {
      crs: Leaflet.CRS.Simple,
      maxBounds: [[0, 0], [-256, 256]],
    });

    Leaflet.control.scale().addTo(map);

    map.on('contextmenu', (e) => {
      this.editor.showMenu().then(() => {
        const marker = new Leaflet.Marker(e.latlng).addTo(map);

        marker.bindPopup('Example Marker');
      });
    });

    map.setView([0, 0], 1);

    Leaflet.tileLayer(`${environment.apiURL}/maps/{id}/tile/{z}/{x}/{y}`, {
      maxZoom: this._map.maxZoom,
      minZoom: this._map.minZoom,
      bounds: [[0, 0], [-256, 256]],
      id: this._map.id,
    }).addTo(map);
  }

  public async delete() {
    try {
      await this.mapService.deleteMap(this._map.id);
    } catch (err) {
      throw err;
    }
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
