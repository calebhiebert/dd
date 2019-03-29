import { Injectable } from '@angular/core';
import { IUser } from './user.service';
import { ICampaign, CampaignService } from './campaign.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMap } from './map.service';
import { ToastrService } from 'ngx-toastr';
import { IQuest } from './quest.service';
import { LoginService, LoginStatus } from './login.service';
import { UpdateHubService } from './update-hub.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _loading = false;
  private _notifications: Notification[];

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    login: LoginService,
    updateHub: UpdateHubService,
    private router: Router,
    private campignService: CampaignService
  ) {
    login.loginStatus.subscribe((status) => {
      if (status === LoginStatus.LOGGED_IN) {
        this.loadNotifications();
      }
    });

    updateHub.notificationUpdate.subscribe(() => {
      this.loadNotifications();
    });

    if (login.isLoggedIn) {
      this.loadNotifications();
    }
  }

  private getNewNotifications(oldList: Notification[], newList: Notification[]) {
    let newNotifications: Notification[] = [];

    if (oldList) {
      for (const n of newList) {
        const old = oldList.find((on) => on.id === n.id);

        if (old === undefined) {
          newNotifications.push(n);
        }
      }
    } else {
      newNotifications = newList;
    }

    return newNotifications;
  }

  private makeNotificationToasts(notifications: Notification[]) {
    for (const n of notifications) {
      if ((n as ISuggestionNotification).suggestionURL) {
        let suggestedBy;

        if (this.campignService.campaign) {
          suggestedBy = this.campignService.campaign.members.find((m) => m.userId === (n as ISuggestionNotification).suggestedById);
        }

        let toastText;

        if (suggestedBy && suggestedBy.user) {
          toastText = `${suggestedBy.user.username} suggested something! ${n.message}`;
        } else {
          toastText = `A suggestion was made. ${n.message}`;
        }

        const toast = this.toast.info(toastText);

        toast.onTap.subscribe(() => {
          this.router.navigateByUrl((n as ISuggestionNotification).suggestionURL);
          this.removeNotification(n);
        });
      } else {
        this.toast.info(n.message);
      }
    }
  }

  private async loadNotifications() {
    this._loading = true;
    try {
      const notifications = await this.getNotifications();
      const newNotifications = this.getNewNotifications(this._notifications, notifications);
      this._notifications = notifications;
      this.makeNotificationToasts(newNotifications);
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

  public async clearAll() {
    this._notifications = [];
    return this.http.delete<void>(`${environment.apiURL}/notifications/clearall`).toPromise();
  }

  public getNotifications(): Promise<Notification[]> {
    return this.http.get<Notification[]>(`${environment.apiURL}/notifications`).toPromise();
  }

  public deleteNotification(id: string): Promise<void> {
    return this.http.delete<void>(`${environment.apiURL}/notifications/${id}`).toPromise();
  }

  public makeSuggestion(suggestion: ISuggestion): Promise<void> {
    return this.http.post<void>(`${environment.apiURL}/notifications/suggest`, suggestion).toPromise();
  }

  public suggestCurrentURL() {
    if (!this.campignService.campaign) {
      return;
    }

    return this.makeSuggestion({
      url: this.router.url,
      message: 'Look!',
      campaignId: this.campignService.campaign.id,
    });
  }

  public get notifications() {
    return this._notifications;
  }

  public get loading() {
    return this._loading;
  }
}

export type Notification = INotification | ICampaignNotification | IMapNotification | IQuestNotification;

export interface INotification {
  id: string;
  message: string;
  userId: string;
  user?: IUser;
  createdAt: Date;
}

export interface ICampaignNotification extends INotification {
  campaignId: string;
  campaign?: ICampaign;
}

export interface IMapNotification extends ICampaignNotification {
  mapId: string;
  map?: IMap;
}

export interface IQuestNotification extends ICampaignNotification {
  questId: string;
  quest?: IQuest;
}

export interface ISuggestionNotification extends ICampaignNotification {
  suggestedById: string;
  suggestedBy?: IUser;
  suggestionURL: string;
}

export interface ISuggestion {
  url: string;
  message: string;
  campaignId: string;
}
