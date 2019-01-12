import { Component, OnInit } from '@angular/core';
import { AboutService, IAboutInfo } from '../about.service';

@Component({
  selector: 'dd-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  public loading = false;

  public local: IAboutInfo;
  public remote: IAboutInfo;

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.load();
  }

  private async load() {
    this.loading = true;

    this.local = this.aboutService.localAbout();

    try {
      const abt = await this.aboutService.remoteAbout();
      this.remote = abt;
    } catch (err) {
      console.log('ABOUT ERR', err);
    }

    this.loading = false;
  }
}
