import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityAttributeEditorModalComponent } from './entity-attribute-editor-modal/entity-attribute-editor-modal.component';
import { EntityService, EntityAttributeClass, IHealth, IViewField, IAttribute, IEntityFieldConfig, IEntity } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from 'src/app/login.service';
import { UpdateHubService, ConnectionState } from 'src/app/update-hub.service';
import { Subscription } from 'rxjs';
import { DynamicFieldType } from 'src/app/custom-controls/dynform/form-types';

@Component({
  selector: 'dd-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.scss'],
})
export class EntityViewComponent implements OnInit, OnDestroy {
  @ViewChild('attributemodal')
  public attributeModal: EntityAttributeEditorModalComponent;

  public loading = false;
  public saving = false;
  public entity: IEntity;

  private _updateHubStatus$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private campaignService: CampaignService,
    private sanitizer: DomSanitizer,
    private login: LoginService,
    private router: Router,
    private update: UpdateHubService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.update.subscribeEntities([params.get('ent_id')]);
      this.loadEntity(params.get('ent_id'));
    });

    this._updateHubStatus$ = this.update.stateUpdate.subscribe((state) => {
      if (state === ConnectionState.CONNECTED && this.entity) {
        this.update.subscribeEntities([this.entity.id]);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.entity) {
      this.update.unsubscribeEntities([this.entity.id]);
    }

    if (this._updateHubStatus$) {
      this._updateHubStatus$.unsubscribe();
    }
  }

  private getEntityField(name: string): IEntityFieldConfig {
    return this.entity.preset.fields.find((f) => f.name === name);
  }

  private async updateEntity() {
    this.saving = true;

    const entityToSave = { ...this.entity, preset: undefined };

    try {
      await this.entityService.updateEntity(entityToSave);
    } catch (err) {
      throw err;
    }

    this.saving = false;
  }

  private async loadEntity(id: string) {
    this.loading = true;

    try {
      this.entity = await this.entityService.getEntity(id);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public async editAttribute(field: IViewField) {
    if (!this.editable) {
      return;
    }

    const modifiers = this.modifiers.filter((m) => (m.config && m.config.options && m.config.options.modifierFor) === field.config.name);

    const fieldValue = await this.attributeModal.editAttribute(field.config, field.field.value, modifiers);

    if (fieldValue !== null && fieldValue !== undefined) {
      for (const entityField of this.entity.fields) {
        if (entityField.name === field.field.name) {
          entityField.value = fieldValue.value;
        }

        if (fieldValue.mods && fieldValue.mods[entityField.name] !== undefined) {
          entityField.value = fieldValue.mods[entityField.name];
        }
      }

      this.updateEntity();
    }
  }

  public async onHPEdit(health: IHealth) {
    this.entity.health = health;
    await this.updateEntity();
  }

  public async editCurrency() {
    if (!this.editable) {
      return;
    }

    const attrValue = await this.attributeModal.editAttribute(
      {
        name: 'Money',
        type: DynamicFieldType.CURRENCY,
        options: {
          required: true,
          levels: this.campaignService.campaign.currencyMap,
          trackCoins: this.campaignService.campaign.trackCoins,
        },
      },
      this.entity.currency
    );

    if (attrValue !== null && attrValue !== undefined) {
      this.entity.currency = attrValue.value;
      this.updateEntity();
    }
  }

  public async editXP() {
    if (!this.editable) {
      return;
    }

    const attrValue = await this.attributeModal.editAttribute(
      {
        name: 'XP',
        description: `Experience points that this ${this.entity.preset.name} has`,
        type: DynamicFieldType.INT,
        options: { required: true, min: 0 },
      },
      this.entity.xp.toString()
    );

    if (attrValue !== null && attrValue !== undefined) {
      this.entity.xp = parseInt(attrValue.value, 10);
      this.updateEntity();
    }
  }

  public openLocationOnMap() {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'maps', this.entity.mapId], {
      queryParams: {
        lat: this.entity.lat,
        lng: this.entity.lng,
      },
    });
  }

  public openConceptEntities(conceptTypeId: string) {
    this.router.navigate(['campaigns', this.campaignService.campaign.id, 'entities', this.entity.id, 'ct', conceptTypeId]);
  }

  public trackAttribute(idx: number, attribute: IAttribute) {
    return attribute.name;
  }

  public get majorAttributes(): IViewField[] {
    return (this.entity.fields || [])
      .map((f) => {
        return {
          field: f,
          config: this.getEntityField(f.name),
        };
      })
      .filter(
        (f) =>
          f.config &&
          f.config.class === EntityAttributeClass.MAJOR &&
          f.config.type !== DynamicFieldType.TEXT_FORMATTED &&
          (f.config.options.modifierFor === null || f.config.options.modifierFor === undefined)
      );
  }

  public get normalAttributes(): IViewField[] {
    return (this.entity.fields || [])
      .map((f) => {
        return {
          field: f,
          config: this.getEntityField(f.name),
        };
      })
      .filter(
        (f) =>
          f.config &&
          f.config.class === EntityAttributeClass.NORMAL &&
          f.config.type !== DynamicFieldType.TEXT_FORMATTED &&
          (f.config.options.modifierFor === null || f.config.options.modifierFor === undefined)
      );
  }

  public get bigTextAttributes(): IViewField[] {
    return (this.entity.fields || [])
      .map((f) => {
        return {
          field: f,
          config: this.getEntityField(f.name),
        };
      })
      .filter((f) => f.config && f.config.type === DynamicFieldType.TEXT_FORMATTED && f.field.value);
  }

  public get minorAttributes(): IViewField[] {
    return (this.entity.fields || [])
      .map((f) => {
        return {
          field: f,
          config: this.getEntityField(f.name),
        };
      })
      .filter((f) => f.config && f.config.class === EntityAttributeClass.MINOR && f.config.type !== DynamicFieldType.TEXT_FORMATTED);
  }

  public get unimportantAttributes(): IViewField[] {
    return (this.entity.fields || [])
      .map((f) => {
        return {
          field: f,
          config: this.getEntityField(f.name),
        };
      })
      .filter((f) => f.config && f.config.class === EntityAttributeClass.UNIMPORTANT && f.config.type !== DynamicFieldType.TEXT_FORMATTED);
  }

  public get modifiers(): IViewField[] {
    return (this.entity.fields || [])
      .map((f) => {
        return {
          field: f,
          config: this.getEntityField(f.name),
        };
      })
      .filter((f) => f.config && f.config.options && f.config.options.modifierFor !== null && f.config.options.modifierFor !== undefined);
  }

  public get level() {
    return this.campaignService.calculateLevel(this.entity.xp);
  }

  public get xpToNextLevel() {
    return this.campaignService.getXPToNextLevel(this.entity.xp);
  }

  public get editable() {
    return this.campaignService.canEdit || this.entity.userId === this.login.id;
  }

  public get preset() {
    if (!this.entity) {
      return null;
    } else {
      return this.campaignService.campaign.entityPresets.find((preset) => preset.id === this.entity.entityPresetId);
    }
  }

  public get user() {
    if (this.entity) {
      const member = this.campaign.members.find((m) => m.userId === this.entity.userId);

      if (member) {
        return member.user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  public get campaign() {
    return this.campaignService.campaign;
  }

  public get conceptTypeList() {
    if (!this.preset) {
      return [];
    }

    return this.campaignService.campaign.conceptTypes.filter((ct) => this.preset.conceptTypesEnabled.indexOf(ct.id) !== -1);
  }

  public backgroundCSS(imageId: string) {
    return this.sanitizer.bypassSecurityTrustStyle(
      `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      url("https://res.cloudinary.com/dqhk8k6iv/image/upload/t_chr_blur/${imageId}.jpg")`
    );
  }
}
