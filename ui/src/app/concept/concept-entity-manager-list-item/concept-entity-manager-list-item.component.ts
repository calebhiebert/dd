import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IConceptEntity, IConceptType, ConceptService } from 'src/app/concept.service';
import { CampaignService } from 'src/app/campaign.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'dd-concept-entity-manager-list-item',
  templateUrl: './concept-entity-manager-list-item.component.html',
  styleUrls: ['./concept-entity-manager-list-item.component.scss'],
})
export class ConceptEntityManagerListItemComponent implements OnInit {
  @Input()
  public conceptEntity: IConceptEntity;

  @Input()
  public conceptType: IConceptType;

  @Input()
  public draggable: boolean;

  @Input()
  public isChild: boolean;

  @Input()
  public allConceptEntities: IConceptEntity[];

  @Output()
  public selected = new EventEmitter<IConceptEntity>();

  @Output()
  public addChild = new EventEmitter<boolean>();

  public childrenCollapsed = true;

  constructor(private campaignService: CampaignService, private conceptService: ConceptService) {}

  ngOnInit() {}

  public select(conceptEntity: IConceptEntity) {
    this.selected.emit(conceptEntity);
  }

  // Called when a drag and drop event has finished
  public async conceptDropped(e: CdkDragDrop<IConceptEntity[]>) {
    const children = this.children;

    moveItemInArray(children, e.previousIndex, e.currentIndex);

    children.forEach((child, idx) => {
      child.sortValue = idx;
    });

    await this.conceptService.updateConceptEntities(children, this.conceptEntity.entityId);
  }

  public doAddChild() {
    this.addChild.emit(true);
  }

  public async doRemoveFromParent() {
    this.conceptEntity.parentConceptId = null;
    this.conceptEntity.parentEntityId = null;
    await this.conceptService.updateConceptEntity(this.conceptEntity);
  }

  public get campaign() {
    return this.campaignService.campaign;
  }

  public get quantityEnabled() {
    return this.conceptType.entityConfig.enabled && this.conceptType.entityConfig.enableQuantity;
  }

  public get children() {
    const children: IConceptEntity[] = [];

    for (const ce of this.allConceptEntities) {
      if (ce.parentConceptId === this.conceptEntity.conceptId) {
        children.push(ce);
      }
    }

    return children.sort((a, b) => a.sortValue - b.sortValue);
  }
}
