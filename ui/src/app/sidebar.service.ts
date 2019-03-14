import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OverviewService } from './overview.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _sidebarOpen = false;

  constructor(private router: Router) {
    router.events.subscribe((v) => {
      this.sidebarOpen = false;
    });
  }

  public toggle() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  public set sidebarOpen(value: boolean) {
    this._sidebarOpen = value;
  }

  public get sidebarOpen() {
    return this._sidebarOpen;
  }
}
