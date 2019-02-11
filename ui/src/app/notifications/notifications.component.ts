import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  NotificationService,
  Notification,
  ICampaignNotification,
  IMapNotification,
} from '../notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dd-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  @Output()
  public done = new EventEmitter<boolean>();

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {}

  public clearNotification(n: Notification) {
    this.notificationService.removeNotification(n);
  }

  public viewCampaign(n: ICampaignNotification) {
    this.notificationService.removeNotification(n);
    this.router.navigate(['campaigns', n.campaignId, 'landing']);
    this.done.emit(true);
  }

  public viewMap(m: IMapNotification) {
    this.notificationService.removeNotification(m);
    this.router.navigate(['campaigns', m.campaignId, 'maps', m.mapId]);
    this.done.emit(true);
  }

  public get notifications() {
    return this.notificationService.notifications;
  }

  public get loading() {
    return this.notificationService.loading;
  }
}
