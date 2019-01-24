import { Injectable } from '@angular/core';
import { IUser } from './user.service';
import { ICampaign } from './campaign.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _loading = false;
  private _notifications: Notification[];

  constructor(private http: HttpClient) {}

  public async loadNotifications() {
    this._loading = true;
    try {
      const notifications = await this.getNotifications();
      this._notifications = notifications;
    } catch (err) {
      throw err;
    }
    this._loading = false;
  }

  public async removeNotification(n: Notification) {
    this._notifications = this._notifications.filter((no) => n !== no);

    try {
      await this.deleteNotification(n.id);
    } catch (err) {
      throw err;
    }
  }

  public getNotifications(): Promise<Notification[]> {
    return this.http
      .get<Notification[]>(`${environment.apiURL}/notifications`)
      .toPromise();
  }

  public deleteNotification(id: string): Promise<void> {
    return this.http
      .delete<void>(`${environment.apiURL}/notifications/${id}`)
      .toPromise();
  }

  public get notifications() {
    return this._notifications;
  }

  public get loading() {
    return this._loading;
  }
}

export type Notification = INotification | ICampaignInviteNotification;

export interface INotification {
  id: string;
  message: string;
  userId: string;
  user?: IUser;
  createdAt: Date;
}

export interface ICampaignInviteNotification extends INotification {
  campaignId: string;
  campaign?: ICampaign;
  inviteUserId: string;
  inviteUser?: IUser;
  accepted?: boolean;
}
