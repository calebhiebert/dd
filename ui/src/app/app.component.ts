import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { UpdateHubService } from './update-hub.service';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ui';

  constructor(private sidebar: SidebarService, private hub: UpdateHubService) {
    this.hub.start();
  }

  public toggle() {
    this.sidebar.toggle();
  }

  public get sidebarOpen() {
    return this.sidebar.sidebarOpen;
  }
}
