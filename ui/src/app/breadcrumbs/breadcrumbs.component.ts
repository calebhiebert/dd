import { Component, OnInit, Injector } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Event } from '@angular/router';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { CampaignComponent } from '../campaign.component';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'dd-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnInit {
  private breadcrumbs$: Subscription;

  public breadcrumbs: IBreadcrumb[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.breadcrumbs$ = this.router.events
      .pipe(
        filter((v) => v instanceof NavigationEnd),
        distinctUntilChanged(),
        map(() => this.updateBreadcrumbs(this.route.root))
      )
      .subscribe();
  }

  private updateBreadcrumbs(route: ActivatedRoute) {
    let cr = route.snapshot;
    const breadcrumbs: IBreadcrumb[] = [];

    while (cr) {
      if (cr.data.breadcrumb !== undefined) {
        breadcrumbs.push({
          display: cr.data.breadcrumb,
          navigate: [],
        });
      }

      cr = cr.firstChild;
    }

    this.breadcrumbs = breadcrumbs;
  }
}

export interface IBreadcrumb {
  display: string;
  navigate: string[];
}
