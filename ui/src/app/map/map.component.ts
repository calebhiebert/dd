import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import L from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MapService, IMap } from '../map.service';
import { MapEditorMenuComponent } from './map-editor-menu/map-editor-menu.component';
import { CampaignService } from '../campaign.service';
import Swal from 'sweetalert2';

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
    private router: Router,
    private mapService: MapService,
    private campaignService: CampaignService
  ) {}

  ngAfterViewInit() {
    this.route.paramMap.subscribe((params) => {
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

    setTimeout(() => {
      this.loading = false;
    }, 1);
  }

  private constructMap() {
    const map = L.map(this.map.nativeElement, {
      crs: L.CRS.Simple,
      maxBounds: [[0, 0], [-256, 256]],
    });

    map.on('contextmenu', (e) => {
      this.editor.showMenu().then((operation) => {
        if (operation != null) {
          const marker = new L.Marker(e.latlng).addTo(map);
          marker.bindPopup('Example Marker');
        }
      });
    });

    map.setView([0, 0], 1);

    L.tileLayer(`${environment.tileURL}/maps/{id}/tile/{z}/{x}/{y}`, {
      maxZoom: this._map.maxZoom,
      minZoom: this._map.minZoom,
      bounds: [[0, 0], [-256, 256]],
      id: this._map.id,
    }).addTo(map);
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
