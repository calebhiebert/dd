import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { LoginService } from '../login.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SidebarService } from '../sidebar.service';
import { NotificationService } from '../notification.service';
import { EntityService, IEntity } from '../entity.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'dd-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public suggestable = false;

  constructor(
    private campaignService: CampaignService,
    private login: LoginService,
    private sidebar: SidebarService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;

          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data) {
              return child.snapshot.data;
            } else {
              return null;
            }
          }

          return null;
        })
      )
      .subscribe((d) => {
        this.suggestable = d.suggestable === true;
      });
  }

  public toggle() {
    this.sidebar.toggle();
  }

  public trackEntity(idx: number, entity: IEntity) {
    return entity.id;
  }

  public async suggest() {
    if (!this.campaign) {
      return;
    }

    try {
      await this.notificationService.suggestCurrentURL();
    } catch (err) {
      throw err;
    }
  }

  public get loadingCampaign() {
    return this.campaignService.loadingCampaign;
  }

  public get campaign() {
    return this.campaignService.campaign;
  }

  public get loggedIn() {
    return this.login.isLoggedIn;
  }

  public get navEntities() {
    if (this.loggedIn && this.campaign) {
      return this.campaign.entities.filter((e) => {
        return !e.spawnable && e.spawnedFromId === null && e.userId === this.login.id;
      });
    } else {
      return null;
    }
  }

  public get notificationText() {
    if (!this.notificationService.notifications) {
      return '...';
    } else {
      return this.notificationService.notifications.length;
    }
  }
}
