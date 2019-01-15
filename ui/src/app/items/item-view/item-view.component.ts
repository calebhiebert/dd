import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService, IItem } from 'src/app/item.service';
import { IItemRarity, CampaignService } from 'src/app/campaign.service';
import { EntityService, IInventoryItem, IEntity } from 'src/app/entity.service';
import { EditableEntitySelectorComponent } from 'src/app/entity/editable-entity-selector/editable-entity-selector.component';

@Component({
  selector: 'dd-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
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
    private entityService: EntityService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
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
      console.log('LOAD ERR', err);
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
        'edit'
      ]);
    } catch (err) {
      console.log(err.name, err.message);
    }
  }

  public async addToInventory() {
    let entity: IEntity;

    if (this.campaignService.editableEntities.length === 1) {
      entity = this.campaignService.editableEntities[0];
    } else {
      // Get entity from list
      entity = await this.entitySelect.selectEntity();
    }

    if (entity === null || entity === undefined) {
      return console.log('Entity not found');
    }

    try {
      const inventory = await this.entityService.getInventory(entity.id);

      if (inventory.find(i => i.itemId === this.item.id)) {
        console.log('Item already in inventory!');
        return;
      }

      const inventoryItem: IInventoryItem = {
        itemId: this.item.id,
        entityId: entity.id,
        quantity: 1
      };

      const createdItem = await this.entityService.createInventoryItem(
        inventoryItem
      );

      console.log('Added to inventory', createdItem);
    } catch (err) {
      console.log('Load ERR', err);
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
