import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IConceptType, ConceptService, IConceptEntity, IConcept } from 'src/app/concept.service';
import { IEntity } from 'src/app/entity.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CampaignService } from 'src/app/campaign.service';
import { IDynamicFieldConfig, DynamicFieldType } from 'src/app/dynform/form-types';
import { Subscription } from 'rxjs';
import { UpdateHubService } from 'src/app/update-hub.service';
import { CdkDragDrop, moveItemInArray, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'dd-concept-entity-manager',
  templateUrl: './concept-entity-manager.component.html',
  styleUrls: ['./concept-entity-manager.component.scss'],
})
export class ConceptEntityManagerComponent implements OnInit, OnDestroy {
  public loading = false;
  public searchLoading = false;
  public working = false;

  public dragEnabledItem: IConceptEntity = null;

  @Input()
  public conceptType: IConceptType;

  @Input()
  public set entity(value: IEntity) {
    this._entity = value;
    this.load();
  }

  public get entity() {
    return this._entity;
  }

  @Input()
  public editable: boolean;

  @ViewChild('picker')
  public pickerModal: ModalComponent<IConcept>;

  @ViewChild('viewandedit')
  public viewAndEditModal: ModalComponent<any>;

  @ViewChild('searchbar')
  public searchInput: ElementRef<HTMLInputElement>;

  public searchResults: IConcept[];
  public selectedConceptEntity: IConceptEntity = null;

  public searchControl: FormControl;
  public editGroup: FormGroup;

  private _conceptEntities: IConceptEntity[];

  private _updateSubscription: Subscription;
  private _deleteSubscription: Subscription;

  private _entity: IEntity;

  constructor(private conceptService: ConceptService, private campaignService: CampaignService, private updateHub: UpdateHubService) {}

  ngOnInit() {
    this.searchControl = new FormControl(null);

    this.editGroup = new FormGroup({
      quantity: new FormControl(null),
      content: new FormControl(null),
    });

    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(250)
      )
      .subscribe((search) => {
        if (search !== null && search !== undefined) {
          this.searchConcepts(search.trim().toLowerCase());
        } else {
          this.searchConcepts('');
        }
      });

    this._updateSubscription = this.updateHub.conceptEntityUpdate.subscribe((ce: IConceptEntity) => {
      if (!this.conceptEntities || !this.entity || !this.conceptType) {
        return;
      }

      if (ce.concept.conceptTypeId === this.conceptType.id && ce.entityId === this.entity.id) {
        const index = this.conceptEntities.findIndex((ece) => ece.conceptId === ce.conceptId && ece.entityId === ce.entityId);

        if (index !== -1) {
          this.conceptEntities[index] = ce;
        } else {
          this.conceptEntities.push(ce);
        }

        this.conceptEntities = this.conceptEntities.slice().sort((a, b) => {
          return a.sortValue - b.sortValue;
        });
      }
    });

    this._deleteSubscription = this.updateHub.conceptEntityDelete.subscribe((ce: IConceptEntity) => {
      if (!this.conceptEntities || !this.entity || !this.conceptType) {
        return;
      }

      if (ce.entityId === this.entity.id) {
        this.conceptEntities = this.conceptEntities.filter((ece) => {
          const match = ece.conceptId === ce.conceptId && ece.entityId === ce.entityId;
          return !match;
        });
      }
    });
  }

  ngOnDestroy() {
    if (this._updateSubscription) {
      this._updateSubscription.unsubscribe();
    }

    if (this._deleteSubscription) {
      this._deleteSubscription.unsubscribe();
    }
  }

  private async load() {
    this.loading = true;

    try {
      this.conceptEntities = await this.conceptService.getConceptEntities(this.entity.id, this.conceptType.id);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  private async searchConcepts(search: string) {
    this.searchLoading = true;

    try {
      const result = await this.conceptService.getConcepts(this.conceptType.id, 10, 0, search);
      this.searchResults = result.concepts;
    } catch (err) {
      throw err;
    }

    this.searchLoading = false;
  }

  public async add() {
    this.searchControl.patchValue(null);
    this.searchConcepts('');
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 1);
    const picked = await this.pickerModal.open();

    if (picked !== null) {
      const nextSortValue = this.conceptEntities.length;

      const conceptEntity: IConceptEntity = {
        conceptId: picked.id,
        concept: picked,
        entityId: this.entity.id,
        quantity: this.quantityEnabled ? 1 : null,
        fields: [],
        sortValue: nextSortValue,
      };

      const existingConceptEntity = this.conceptEntities.find(
        (ce) => ce.conceptId === conceptEntity.conceptId && ce.entityId === conceptEntity.entityId
      );

      if (existingConceptEntity === undefined) {
        this.conceptEntities.push(conceptEntity);
      }

      this.working = true;

      try {
        await this.conceptService.updateConceptEntity(conceptEntity);
      } catch (err) {
        throw err;
      }

      this.working = false;
    }
  }

  public async select(conceptEntity: IConceptEntity) {
    // A click was received on a item that is currently being dragged
    if (conceptEntity === this.dragEnabledItem) {
      return;
    }

    this.selectedConceptEntity = conceptEntity;

    this.editGroup.patchValue({
      quantity: conceptEntity.quantity || 1,
      content: conceptEntity.content,
    });

    this.viewAndEditModal.open().then(() => {
      this.selectedConceptEntity = null;
    });
  }

  public async save() {
    this.working = true;

    try {
      const toSave = {
        ...this.selectedConceptEntity,
        quantity: this.quantityControl.value,
        content: this.contentControl.value,
      };

      // Patch value
      for (const ce of this.conceptEntities) {
        if (ce.conceptId === toSave.conceptId && ce.entityId === toSave.entityId) {
          Object.assign(ce, toSave);
        }
      }

      this.viewAndEditModal.close(null);

      await this.conceptService.updateConceptEntity(toSave);
    } catch (err) {
      throw err;
    }

    this.working = false;
  }

  public async remove(conceptEntity: IConceptEntity) {
    this.working = true;

    try {
      this.conceptEntities = this.conceptEntities.filter((ce) => {
        const match = ce.conceptId === conceptEntity.conceptId && ce.entityId === conceptEntity.entityId;

        return !match;
      });

      this.viewAndEditModal.close(null);

      await this.conceptService.deleteConceptEntity(conceptEntity.entityId, conceptEntity.conceptId);
    } catch (err) {
      throw err;
    }

    this.working = false;
  }

  public trackConcept(idx: number, concept: IConcept) {
    return concept.id;
  }

  public trackConceptEntity(idx: number, conceptEntity: IConceptEntity) {
    return conceptEntity.conceptId + conceptEntity.entityId;
  }

  // Called when a drag and drop event has finished
  public async conceptDropped(e: CdkDragDrop<IConceptEntity[]>) {
    this.dragEnabledItem = null;

    moveItemInArray(this.conceptEntities, e.previousIndex, e.currentIndex);

    this.conceptEntities.forEach((ce, idx) => {
      ce.sortValue = idx;
    });

    await this.conceptService.updateConceptEntities(this.conceptEntities, this.entity.id);
  }

  public longPress(ce: IConceptEntity) {
    // Can't drag things around unless this entity is editable
    if (!this.editable) {
      return;
    }

    this.dragEnabledItem = ce;
  }

  public get quantityEnabled() {
    return this.conceptType.entityConfig.enabled && this.conceptType.entityConfig.enableQuantity;
  }

  public get campaign() {
    return this.campaignService.campaign;
  }

  public get quantityControl() {
    return this.editGroup.get('quantity');
  }

  public get contentControl() {
    return this.editGroup.get('content');
  }

  public get conceptEntities() {
    return this._conceptEntities;
  }

  public set conceptEntities(value: IConceptEntity[]) {
    this._conceptEntities = value;
  }

  public get quantityFieldConfig(): IDynamicFieldConfig {
    if (!this.selectedConceptEntity || !this.entity) {
      return {
        name: 'Quantity',
        type: DynamicFieldType.INT,
      };
    }

    return {
      name: 'Quantity',
      description: `How many ${this.selectedConceptEntity.concept.name} does ${this.entity.name} have?`,
      type: DynamicFieldType.INT,
      options: {
        min: 0,
      },
    };
  }

  public get notesFieldConfig(): IDynamicFieldConfig {
    return {
      name: 'Notes',
      description: `All players will be able to see these notes`,
      type: DynamicFieldType.TEXT_FORMATTED,
    };
  }
}
