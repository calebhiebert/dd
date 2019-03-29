import { Component, OnInit, Input } from '@angular/core';
import { IEntity, EntityService } from 'src/app/entity.service';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-spawnable-list-item',
  templateUrl: './spawnable-list-item.component.html',
  styleUrls: ['./spawnable-list-item.component.css'],
})
export class SpawnableListItemComponent implements OnInit {
  public spawnMode = false;

  public spawning = false;

  @Input()
  public spawnable: IEntity;

  constructor(private entityService: EntityService, private router: Router, private campaignService: CampaignService) {}

  ngOnInit() {}

  public edit() {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'entities',
      this.spawnable.entityPresetId,
      this.spawnable.id,
      'edit',
    ]);
  }

  public async spawn(count: number) {
    this.spawning = true;

    try {
      await this.entityService.spawnSpawnable(this.spawnable.id, count);
      await this.router.navigate(['campaigns', this.campaignService.campaign.id, 'overview']);
    } catch (err) {
      throw err;
    }

    this.spawning = false;
  }
}
