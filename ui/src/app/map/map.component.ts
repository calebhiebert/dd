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

@Component({
  selector: 'dd-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map')
  private map: ElementRef<HTMLDivElement>;

  private _map: IMap;

  public loading = false;

  constructor(private route: ActivatedRoute, private mapService: MapService) {}

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
    console.log(this._map);

    const map = Leaflet.map(this.map.nativeElement, {
      crs: Leaflet.CRS.Simple,
      maxBounds: [[0, 0], [-256, 256]],
    });

    map.on('click', (e) => console.log(e.latlng));

    map.setView([0, 0], 1);

    Leaflet.tileLayer(`${environment.apiURL}/maps/{id}/tile/{z}/{x}/{y}`, {
      maxZoom: this._map.maxZoom,
      minZoom: this._map.minZoom,
      bounds: [[0, 0], [-256, 256]],
      id: this._map.id,
    }).addTo(map);
  }
}
