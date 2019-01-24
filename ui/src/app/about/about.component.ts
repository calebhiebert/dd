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
      throw err;
    }

    this.loading = false;
  }

  public makeDummyException() {
    const error = new Error('This is a test error!');
    error.name = 'SentryTestError';
    throw error;
  }
}
