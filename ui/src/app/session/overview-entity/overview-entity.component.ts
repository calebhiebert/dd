import { Component, OnInit, Input } from '@angular/core';
import { IEntity } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-overview-entity',
  templateUrl: './overview-entity.component.html',
  styleUrls: ['./overview-entity.component.css'],
})
export class OverviewEntityComponent implements OnInit {
  @Input()
  public entity: IEntity;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public get preset() {
    return this.campaignService.campaign.entityPresets.find(
      (preset) => preset.id === this.entity.entityPresetId
    );
  }
}
