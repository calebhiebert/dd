import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityService } from '../entity.service';
import { CampaignService } from '../campaign.service';
import { Entity } from '../entity';
import { EntityAttributeEditorModalComponent } from './entity-attribute-editor-modal/entity-attribute-editor-modal.component';
import { AttributeType } from '../attributes';

@Component({
  selector: 'dd-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.scss'],
})
export class EntityViewComponent implements OnInit {
  @ViewChild('attributemodal')
  public attributeModal: EntityAttributeEditorModalComponent;

  public entity: Entity;

  public loading = false;

  public saving = false;

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private campaignService: CampaignService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.loadEntity(params.get('ent_id'));
    });
  }

  private async loadEntity(id: string) {
    this.loading = true;

    try {
      const ent = await this.entityService.getEntity(this.campaignService.campaign.id, id);
      this.entity = ent;
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.loading = false;
  }

  public async editName() {
    const attrValue = await this.attributeModal.editAttribute(
      {
        name: 'Name',
        description: `What the ${this.entity.preset.name} is called`,
        type: AttributeType.STRING,
        required: true,
        min: 2,
        max: 30,
      },
      this.entity.name,
    );

    if (attrValue !== null) {
      this.entity.name = attrValue;
      this.updateEntity();
    }
  }

  private async updateEntity() {
    this.saving = true;

    try {
      await this.entityService.saveEntity(this.campaignService.campaign.id, this.entity);
    } catch (err) {
      console.log('UPDATE ERR', err);
    }

    this.saving = false;
  }

  public get level() {
    return this.campaignService.calculateLevel(this.entity.xp);
  }
}
