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

@Component({
  selector: 'dd-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('map')
  private map: ElementRef<HTMLDivElement>;

  private _mapId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this._mapId = params.get('m_id');
      console.log(this._mapId);
    });
  }

  ngAfterViewInit() {
    const map = Leaflet.map(this.map.nativeElement, {
      crs: Leaflet.CRS.Simple,
      maxBounds: [[0, 0], [-256, 256]],
    });

    map.on('click', (e) => console.log(e.latlng));

    map.setView([0, 0], 1);

    Leaflet.tileLayer(`${environment.apiURL}/maps/{id}/tile/{z}/{x}/{y}`, {
      maxZoom: 4,
      minZoom: 0,
      id: this._mapId,
    }).addTo(map);
  }
}
