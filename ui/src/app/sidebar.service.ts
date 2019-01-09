import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public sidebarOpen = false;

  constructor(private router: Router) {
    router.events.subscribe((v) => {
      this.sidebarOpen = false;
    });
  }

  public toggle() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
