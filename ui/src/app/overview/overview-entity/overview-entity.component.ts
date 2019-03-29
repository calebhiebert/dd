import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IEntity, IHealth, EntityService } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { LoginService } from 'src/app/login.service';
import { OverviewService } from 'src/app/overview.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'dd-overview-entity',
  templateUrl: './overview-entity.component.html',
  styleUrls: ['./overview-entity.component.css'],
})
export class OverviewEntityComponent implements OnInit {
  public saving = false;

  @Input()
  public entity: IEntity;

  @Input()
  public label: string;

  @Input()
  public showMoveIcon: boolean;

  @Output()
  public editLabel = new EventEmitter<boolean>();

  constructor(
    private campaignService: CampaignService,
    private loginService: LoginService,
    private entityService: EntityService,
    private overviewService: OverviewService
  ) {}

  ngOnInit() {}

  public async updateEntity(entity: IEntity) {
    this.saving = true;

    try {
      await this.entityService.updateEntity(entity);
    } catch (err) {
      throw err;
    }

    this.saving = false;
  }

  public onHealthChange(health: IHealth) {
    this.updateEntity({ ...this.entity, health: health });
  }

  public async kill() {
    const confirmation = await Swal.fire({
      titleText: 'Are you sure?',
      text: 'You will not be able to undo this',
    });

    if (confirmation.value === true) {
      await this.entityService.deleteEntity(this.entity.id);
    }
  }

  public get preset() {
    return this.campaignService.campaign.entityPresets.find((preset) => preset.id === this.entity.entityPresetId);
  }

  public get editable() {
    return (this.campaignService.canEdit || this.entity.userId === this.loginService.id) && this.overviewService.viewMode === 'full';
  }

  public get conceptTypes() {
    return this.campaignService.campaign.conceptTypes.filter((ct) => ct.isUsableInOverviewScreen === true);
  }
}
