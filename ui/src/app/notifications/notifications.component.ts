import { Component, OnInit } from '@angular/core';
import {
  NotificationService,
  Notification,
  ICampaignNotification,
} from '../notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dd-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {}

  public clearNotification(n: Notification) {
    this.notificationService.removeNotification(n);
  }

  public viewCampaign(n: ICampaignNotification) {
    this.router.navigate(['campaigns', n.campaignId, 'landing']);
  }

  public get notifications() {
    return this.notificationService.notifications;
  }

  public get loading() {
    return this.notificationService.loading;
  }
}
