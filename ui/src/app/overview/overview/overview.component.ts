import { Component, OnInit } from '@angular/core';
import { CampaignService, ICampaign } from 'src/app/campaign.service';
import { IEntity } from 'src/app/entity.service';
import { OverviewService } from 'src/app/overview.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'dd-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  public loading = false;

  constructor(private campaignService: CampaignService, private overviewService: OverviewService) {}

  ngOnInit() {
    this.overviewService.loadOverviewState();
  }

  public trackEntityElement(idx: number, ent: IEntity) {
    return ent.id;
  }

  public entityDropped(evt: CdkDragDrop<any>) {
    this.overviewService.swapEntities(evt.previousIndex, evt.currentIndex);
  }

  public get campaign(): ICampaign {
    return this.campaign;
  }

  public get editable(): boolean {
    return this.campaignService.canEdit;
  }

  public get sortedEntities(): IEntity[] {
    return this.overviewService.sortedEntities;
  }

  public get state() {
    return this.overviewService.state;
  }

  public get reorderable() {
    return this.overviewService.reorderable;
  }
}
