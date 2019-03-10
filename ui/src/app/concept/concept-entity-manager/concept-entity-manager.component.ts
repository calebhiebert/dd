import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IConceptType, IConceptsQueryResult, ConceptService, IConceptEntity, IConcept } from 'src/app/concept.service';
import { IEntity } from 'src/app/entity.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-concept-entity-manager',
  templateUrl: './concept-entity-manager.component.html',
  styleUrls: ['./concept-entity-manager.component.css']
})
export class ConceptEntityManagerComponent implements OnInit {

  public loading = false;
  public searchLoading = false;
  public working = false;

  @Input()
  public conceptType: IConceptType;

  @Input()
  public entity: IEntity;

  @Input()
  public editable: boolean;

  @ViewChild('picker')
  public pickerModal: ModalComponent<IConcept>;

  public conceptEntities: IConceptEntity[];
  public searchResults: IConcept[];

  public searchControl: FormControl;

  constructor(private conceptService: ConceptService, private campaignService: CampaignService) { }

  ngOnInit() {
    this.searchControl = new FormControl(null);

    this.searchControl.valueChanges.pipe(distinctUntilChanged(), debounceTime(250)).subscribe(search => {
      if (search !== null && search !== undefined) {
        this.searchConcepts(search.trim().toLowerCase());
      } else {
        this.searchConcepts('');
      }
    });

    this.load();
  }

  private async load() {
    this.loading = true;

    try {
      this.conceptEntities = await this.conceptService.getConceptEntities(this.entity.id);
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
    this.searchConcepts('');
    const picked = await this.pickerModal.open();

    if (picked !== null) {
      const conceptEntity: IConceptEntity = {
        conceptId: picked.id,
        concept: picked,
        entityId: this.entity.id,
        quantity: this.quantityEnabled ? 1 : null,
        fields: []
      };

      this.conceptEntities.push(conceptEntity);

      this.working = true;

      try {
        await this.conceptService.updateConceptEntity(conceptEntity);
      } catch (err) {
        throw err;
      }

      this.working = false;
    }
  }

  public async viewOrEdit() { }

  public get quantityEnabled() {
    return this.conceptType.entityConfig.enabled && this.conceptType.entityConfig.enableQuantity;
  }

  public get campaign() {
    return this.campaignService.campaign;
  }
}
