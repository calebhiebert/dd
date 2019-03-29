import { Component, OnInit } from '@angular/core';
import { IEntity, EntityService, IEntityPreset } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dd-spawnable-manager',
  templateUrl: './spawnable-manager.component.html',
  styleUrls: ['./spawnable-manager.component.css'],
})
export class SpawnableManagerComponent implements OnInit {
  public loading = false;
  public spawnables: IEntity[] = null;

  constructor(private router: Router, private entityService: EntityService, private campaignService: CampaignService) {}

  ngOnInit() {
    this.load();
  }

  public async load() {
    this.loading = true;

    try {
      this.spawnables = await this.entityService.getEntities(this.campaignService.campaign.id, true);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public addSpawnable(entityPreset: IEntityPreset) {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'entities', entityPreset.id, 'create'], {
      queryParams: {
        spawnable: true,
      },
    });
  }

  public selectSpawnable(spawnable: IEntity) {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'entities', spawnable.entityPresetId, spawnable.id, 'edit']);
  }

  public get campaign() {
    return this.campaignService.campaign;
  }
}
