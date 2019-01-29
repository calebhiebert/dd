import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService, IItem } from 'src/app/item.service';
import { IItemRarity, CampaignService } from 'src/app/campaign.service';
import { EntityService, IInventoryItem, IEntity } from 'src/app/entity.service';
import { EditableEntitySelectorComponent } from 'src/app/entity/editable-entity-selector/editable-entity-selector.component';
import { ToastrService } from 'ngx-toastr';
import * as Sentry from '@sentry/browser';

@Component({
  selector: 'dd-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css'],
})
export class ItemViewComponent implements OnInit {
  public loading = false;
  public item: IItem;

  @ViewChild('entityselect')
  private entitySelect: EditableEntitySelectorComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private campaignService: CampaignService,
    private entityService: EntityService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('item_id');

      if (id) {
        this.loadItem(id);
      }
    });
  }

  private async loadItem(id: string) {
    this.loading = true;

    try {
      const item = await this.itemService.getItem(id);
      this.item = item;
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public async edit() {
    try {
      await this.router.navigate([
        'campaign',
        'manage',
        this.campaignService.campaign.id,
        'items',
        this.item.id,
        'edit',
      ]);
    } catch (err) {
      throw err;
    }
  }

  public async addToInventory() {
    let entity: IEntity;

    // A filtered list of all entities that support inventories
    const inventoryableEntities = this.campaignService.editableEntities.filter(
      (e) => {
        if (!e.preset) {
          const preset = this.campaignService.getEntityPreset(e.entityPresetId);

          // This would be weird, capture the event
          if (!preset) {
            Sentry.captureEvent({
              message:
                'An entity existed on the campaign, but it did not have the corresponding preset.',
              extra: {
                campaign: this.campaignService.campaign,
              },
            });

            return false;
          }

          e.preset = preset;
        }

        return e.preset.isInventoryEnabled;
      }
    );

    if (inventoryableEntities.length === 1) {
      entity = inventoryableEntities[0];
    } else {
      // Get entity from list
      entity = await this.entitySelect.selectEntity(inventoryableEntities);
    }

    // This means that an entity was not selected
    if (entity === null || entity === undefined) {
      return;
    }

    try {
      const inventory = await this.entityService.getInventory(entity.id);

      if (inventory.find((i) => i.itemId === this.item.id)) {
        this.toast.warning(
          `<span class="text-bold">${
            entity.name
          }</span> already has <span class="text-bold">${
            this.item.name
          }</span> in their inventory`,
          '',
          {
            enableHtml: true,
          }
        );
        return;
      }

      const inventoryItem: IInventoryItem = {
        itemId: this.item.id,
        entityId: entity.id,
        quantity: 1,
      };

      const createdItem = await this.entityService.createInventoryItem(
        inventoryItem
      );

      this.toast.info(
        `Added 1x ${this.item.name} to the inventory of ${entity.name}`
      );
    } catch (err) {
      throw err;
    }
  }

  public get rarity(): IItemRarity {
    if (
      this.campaignService.campaign &&
      this.campaignService.campaign.itemRarities &&
      this.item
    ) {
      return this.campaignService.campaign.itemRarities[this.item.rarity];
    } else {
      return null;
    }
  }

  public get weight(): string {
    if (!this.item) {
      return '';
    }

    if (this.item.weight > 0) {
      return `${this.item.weight}kg`;
    } else {
      return 'Weightless';
    }
  }

  public get editable() {
    return this.campaignService.canEdit;
  }

  public get canAddToInventory() {
    return this.campaignService.editableEntities.length > 0;
  }
}
