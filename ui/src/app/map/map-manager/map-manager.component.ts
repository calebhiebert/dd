import { Component, OnInit } from '@angular/core';
import { MapService, IMap } from 'src/app/map.service';
import { CampaignService } from 'src/app/campaign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dd-map-manager',
  templateUrl: './map-manager.component.html',
  styleUrls: ['./map-manager.component.css'],
})
export class MapManagerComponent implements OnInit {
  public loading = false;
  public maps: IMap[];

  constructor(
    private mapService: MapService,
    private campaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  private async load() {
    this.loading = true;

    try {
      this.maps = await this.mapService.getMaps(
        this.campaignService.campaign.id
      );
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public selectMap(map: IMap) {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'maps',
      map.id,
    ]);
  }

  public newMap() {
    this.router.navigate([
      'campaign',
      'manage',
      this.campaignService.campaign.id,
      'maps',
      'upload',
    ]);
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
