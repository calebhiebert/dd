import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityPreset } from 'src/app/entity';
import { EntityService } from 'src/app/entity.service';

@Component({
  selector: 'dd-entity-type-selector',
  templateUrl: './entity-type-selector.component.html',
  styleUrls: ['./entity-type-selector.component.scss'],
})
export class EntityTypeSelectorComponent implements OnInit {
  public creating = false;

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute,
    private entityService: EntityService
  ) {}

  ngOnInit() {}

  public async selectEntityType(preset: EntityPreset) {
    this.creating = true;

    try {
      const entId = await this.entityService.createEntity(
        this.campaignService.campaign.id,
        preset.id
      );
      this.router.navigate(['..', entId, 'edit'], { relativeTo: this.route });
    } catch (err) {
      console.log('CREATE ERR', err);
    }

    this.creating = false;
  }

  public get presets() {
    return this.campaignService.campaign.entityPresets;
  }

  public imageSource(id: string): string {
    return `https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/${id}.png`;
  }
}
