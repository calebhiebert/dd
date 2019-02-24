import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'dd-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css'],
})
export class MapToolbarComponent implements OnInit {
  @Input()
  public title: string;

  constructor(private location: Location) {}

  ngOnInit() {}

  public back() {
    this.location.back();
  }
}
