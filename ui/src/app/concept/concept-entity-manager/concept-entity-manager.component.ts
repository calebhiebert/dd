import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IConceptType, ConceptService, IConceptEntity, IConcept } from 'src/app/concept.service';
import { IEntity, EntityService } from 'src/app/entity.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CampaignService } from 'src/app/campaign.service';
import { Subscription } from 'rxjs';
import { UpdateHubService } from 'src/app/update-hub.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { ModalComponent } from 'src/app/custom-controls/modal/modal.component';
import { DynamicFieldType, IDynamicFieldConfig } from 'src/app/custom-controls/dynform/form-types';

@Component({
  selector: 'dd-concept-entity-manager',
  templateUrl: './concept-entity-manager.component.html',
  styleUrls: ['./concept-entity-manager.component.scss'],
})
export class ConceptEntityManagerComponent implements OnInit, OnDestroy {
  public loading = false;
  public searchLoading = false;
  public working = false;
  public draggingEnabled = false;
  public loadErr: any;

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

  @ViewChild('picker')
  public pickerModal: ModalComponent<IConcept>;

  @ViewChild('viewandedit')
  public viewAndEditModal: ModalComponent<any>;

  @ViewChild('nestselector')
  public nestSelector: ModalComponent<IConcept>;

  @ViewChild('searchbar')
  public searchInput: ElementRef<HTMLInputElement>;

  public searchResults: IConcept[];
  public totalResults: number;
  public selectedConceptEntity: IConceptEntity = null;
  public nestSelectorParent: IConceptEntity;

  public searchControl: FormControl;
  public editGroup: FormGroup;

  private _conceptEntities: IConceptEntity[];
  private _updateSubscription: Subscription;
  private _deleteSubscription: Subscription;

  private _entity: IEntity;

  constructor(
    private conceptService: ConceptService,
    private campaignService: CampaignService,
    private entityService: EntityService,
    private updateHub: UpdateHubService,
    private login: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

    this.route.paramMap.subscribe((params) => {
      const conceptTypeId = params.get('ct_id');
      const entityId = params.get('ent_id');

      if (conceptTypeId && entityId) {
        this.loadInitial(entityId, conceptTypeId);
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

  private async loadInitial(entityId: string, conceptTypeId: string) {
    this.loading = true;

    try {
      const [conceptType, entity] = await Promise.all([
        this.conceptService.getConceptType(conceptTypeId),
        this.entityService.getEntity(entityId),
      ]);

      this.conceptType = conceptType;
      this.entity = entity;

      if (this.entity) {
        await this.updateHub.unsubscribeEntities([this.entity.id]);
      }

      await this.updateHub.subscribeEntities([this.entity.id]);
    } catch (err) {
      this.loadErr = err;
    }

    this.loading = false;
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
      this.totalResults = result.total;
    } catch (err) {
      throw err;
    }

    this.searchLoading = false;
  }

  public createConcept() {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'concepts', this.conceptType.id, 'create'], {
      queryParams: {
        name: this.searchControl.value,
      },
    });
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
  public conceptDropped(e: CdkDragDrop<IConceptEntity[]>) {
    const tlCE = this.topLevelConceptEntities;

    moveItemInArray(tlCE, e.previousIndex, e.currentIndex);

    tlCE.forEach((tlce, idx) => {
      tlce.sortValue = idx;
    });
  }

  public async selectChildToNest(parent: IConceptEntity) {
    this.nestSelectorParent = parent;
    const concept = await this.nestSelector.open();

    if (concept !== null) {
      const conceptEntity = this.conceptEntities.find((ce) => ce.conceptId === concept.id);

      conceptEntity.parentConceptId = parent.conceptId;
      conceptEntity.parentEntityId = parent.entityId;

      try {
        await this.conceptService.updateConceptEntity(conceptEntity);
      } catch (err) {
        throw err;
      }
    }
  }

  public async toggleReorder() {
    this.draggingEnabled = !this.draggingEnabled;

    // This means the order should be saved
    if (this.draggingEnabled === false) {
      await this.conceptService.updateConceptEntities(this.topLevelConceptEntities, this.entity.id);
    }
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

  public get topLevelConceptEntities() {
    if (!this.conceptEntities) {
      return;
    }

    return this.conceptEntities
      .filter((ce) => ce.parentConceptId === null || ce.parentConceptId === undefined)
      .sort((a, b) => a.sortValue - b.sortValue);
  }

  public get editable() {
    if (this.entity) {
      return this.entity.userId === this.login.id || this.campaignService.canEdit;
    } else {
      return false;
    }
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

  /**
   * Whether or not the user can manage this type of concepts
   */
  public get conceptTypeEditable() {
    if (this.conceptType) {
      return this.conceptType.playerEditable || this.campaignService.canEdit;
    } else {
      return false;
    }
  }

  public get nestableConcepts() {
    return this.conceptEntities
      .filter(
        (ce) => ce.conceptId !== this.nestSelectorParent.conceptId && (ce.parentConceptId === null || ce.parentConceptId === undefined)
      )
      .map((ce) => ce.concept);
  }
}
