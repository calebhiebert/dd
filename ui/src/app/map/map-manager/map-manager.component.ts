import { Component, OnInit } from '@angular/core';
import { MapService, IMap } from 'src/app/map.service';
import { CampaignService } from 'src/app/campaign.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
      'campaigns',
      this.campaignService.campaign.id,
      'maps',
      'upload',
    ]);
  }

  public async delete(map: IMap) {
    if (
      (await Swal.fire({ title: 'Are you sure?', showCancelButton: true }))
        .value === true
    ) {
      try {
        await this.mapService.deleteMap(map.id);
        this.load();
      } catch (err) {
        throw err;
      }
    }
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
