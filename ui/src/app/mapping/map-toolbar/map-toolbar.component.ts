import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dd-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css'],
})
export class MapToolbarComponent implements OnInit {
  @Input()
  public title: string;

  @Input()
  public loading: boolean;

  constructor(private location: Location, private notificationService: NotificationService) {}

  ngOnInit() {}

  public back() {
    this.location.back();
  }

  public suggest() {
    this.notificationService.suggestCurrentURL();
  }
}
