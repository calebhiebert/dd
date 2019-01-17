import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityService, IEntityPreset } from 'src/app/entity.service';

@Component({
  selector: 'dd-entity-type-selector',
  templateUrl: './entity-type-selector.component.html',
  styleUrls: ['./entity-type-selector.component.scss']
})
export class EntityTypeSelectorComponent implements OnInit {
  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute,
    private entityService: EntityService
  ) {}

  ngOnInit() {}

  public async selectEntityType(preset: IEntityPreset) {
    this.router.navigate(['..', preset.id, 'create'], {
      relativeTo: this.route
    });
  }

  public get presets(): IEntityPreset[] {
    return this.campaignService.campaign.entityPresets.filter(
      e => e.playerCreatable
    );
  }
}
