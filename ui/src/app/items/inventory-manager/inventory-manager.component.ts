import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IInventoryItem, EntityService } from 'src/app/entity.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { IItem } from 'src/app/item.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { numberValidator } from 'src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-inventory-manager',
  templateUrl: './inventory-manager.component.html',
  styleUrls: ['./inventory-manager.component.css'],
})
export class InventoryManagerComponent implements OnInit {
  public working = false;
  public loading = false;
  public inventory: IInventoryItem[];

  // Will be set to the item currently being edited
  public editingItem: IInventoryItem;

  public editFormGroup: FormGroup;

  @Input()
  public entityId: string;

  @Input()
  public editable = false;

  @ViewChild('itemselect')
  public itemSelectModal: ModalComponent<any>;

  @ViewChild('itemedit')
  public itemEditModal: ModalComponent<any>;

  constructor(
    private entityService: EntityService,
    private toastr: ToastrService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    if (!this.entityId) {
      throw new Error('Entity id is required');
    }

    this.loadInventory();
  }

  private async loadInventory() {
    this.loading = true;

    try {
      const inventory = await this.entityService.getInventory(this.entityId);
      this.inventory = inventory;
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public async addItem(item: IItem) {
    if (!this.editable) {
      return;
    }

    this.itemSelectModal.close(null);

    const inventoryItem: IInventoryItem = {
      itemId: item.id,
      item: item,
      entityId: this.entityId,
      quantity: 1,
    };

    // Check if the inventory already has this item
    if (this.inventory.find((i) => i.itemId === inventoryItem.itemId)) {
      return;
    }

    this.working = true;

    try {
      const createdInventoryItem = await this.entityService.updateInventoryItem(
        inventoryItem
      );

      this.inventory.push(createdInventoryItem);
    } catch (err) {
      throw err;
    }

    this.working = false;
  }

  public async editItem(item: IInventoryItem) {
    if (!this.editable) {
      return;
    }

    this.editFormGroup = new FormGroup({
      quantity: new FormControl(item.quantity, [
        numberValidator,
        Validators.required,
        Validators.min(0),
      ]),
    });
    this.editingItem = item;

    this.itemEditModal.open().then(() => {
      this.editingItem = undefined;
      this.editFormGroup = undefined;
    });
  }

  public async saveItem() {
    if (!this.editFormGroup.valid || !this.editable) {
      return;
    }

    this.working = true;

    const item = this.editingItem;

    item.quantity = this.editFormGroup.value.quantity;

    try {
      if (item.quantity === 0) {
        await this.entityService.deleteInventoryItem(
          this.entityId,
          item.itemId
        );
        this.inventory = this.inventory.filter((itm) => itm !== item);
      } else {
        await this.entityService.updateInventoryItem(item);
      }

      this.itemEditModal.close(null);
    } catch (err) {
      throw err;
    }

    this.working = false;
  }

  public async useItem(inventoryItem: IInventoryItem) {
    if (!this.editable) {
      return;
    }

    this.working = true;

    try {
      if (inventoryItem.quantity === 1) {
        await this.entityService.deleteInventoryItem(
          this.entityId,
          inventoryItem.itemId
        );
        this.inventory = this.inventory.filter((itm) => itm !== inventoryItem);
        this.toastr.info(`Used 1x ${inventoryItem.item.name}`);
      } else {
        await this.entityService.updateInventoryItem({
          ...inventoryItem,
          quantity: inventoryItem.quantity - 1,
        });
        inventoryItem.quantity--;
        this.toastr.info(`Used 1x ${inventoryItem.item.name}`);
      }
    } catch (err) {
      throw err;
    }

    this.working = false;
  }

  public get campaign() {
    return this.campaignService.campaign;
  }
}
