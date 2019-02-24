import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateHubService } from '../update-hub.service';

@Component({
  selector: 'dd-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public hidden = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hub: UpdateHubService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.hidden = data.footer === false;
    });
  }

  public get connectionStatus() {
    return this.hub.state;
  }
}
