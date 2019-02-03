import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import Leaflet from 'leaflet';

@Component({
  selector: 'dd-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('map')
  private map: ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const map = Leaflet.map(this.map.nativeElement, {
      crs: Leaflet.CRS.Simple,
      maxBounds: [[0, 0], [-1024, 1024]],
    });

    map.on('click', (e) => console.log(e.latlng));

    map.setView([0, 0], 1);

    Leaflet.tileLayer('http://localhost:8081/map/{z}/{x}/{y}', {
      maxZoom: 7,
      minZoom: 0,
    }).addTo(map);
  }
}
