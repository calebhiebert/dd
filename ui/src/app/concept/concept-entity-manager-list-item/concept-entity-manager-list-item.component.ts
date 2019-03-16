import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IConceptEntity, IConceptType } from 'src/app/concept.service';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-concept-entity-manager-list-item',
  templateUrl: './concept-entity-manager-list-item.component.html',
  styleUrls: ['./concept-entity-manager-list-item.component.css'],
})
export class ConceptEntityManagerListItemComponent implements OnInit {
  @Input()
  public conceptEntity: IConceptEntity;

  @Input()
  public conceptType: IConceptType;

  @Input()
  public draggable: boolean;

  @Output()
  public selected = new EventEmitter<IConceptEntity>();

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public select(conceptEntity: IConceptEntity) {
    this.selected.emit(conceptEntity);
  }

  public get campaign() {
    return this.campaignService.campaign;
  }

  public get quantityEnabled() {
    return this.conceptType.entityConfig.enabled && this.conceptType.entityConfig.enableQuantity;
  }
}
