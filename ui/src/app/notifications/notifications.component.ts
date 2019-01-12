import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../notification.service';

@Component({
  selector: 'dd-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {}

  public clearNotification(n: Notification) {
    this.notificationService.removeNotification(n);
  }

  public get notifications() {
    return this.notificationService.notifications;
  }

  public get loading() {
    return this.notificationService.loading;
  }
}
