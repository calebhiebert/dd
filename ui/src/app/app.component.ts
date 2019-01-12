import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { LoginService } from './login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ui';

  private showLoginLoading = true;

  constructor(
    private sidebar: SidebarService,
    private login: LoginService,
    private route: ActivatedRoute
  ) {
    route.data.subscribe((data) => {
      this.showLoginLoading = data.showLoginLoading || true;
    });
  }

  public toggle() {
    this.sidebar.toggle();
  }

  public get sidebarOpen() {
    return this.sidebar.sidebarOpen;
  }

  public get loginLoading() {
    if (this.showLoginLoading === false) {
      return false;
    }

    return this.login.loginInProgress;
  }
}
