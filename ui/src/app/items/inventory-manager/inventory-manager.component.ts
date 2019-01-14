import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IInventoryItem, EntityService } from 'src/app/entity.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { IItem } from 'src/app/item.service';

@Component({
  selector: 'dd-inventory-manager',
  templateUrl: './inventory-manager.component.html',
  styleUrls: ['./inventory-manager.component.css']
})
export class InventoryManagerComponent implements OnInit {
  public loading = false;
  public inventory: IInventoryItem[];

  @Input()
  public entityId: string;

  @ViewChild('itemselect')
  public itemSelectModal: ModalComponent<IItem>;

  constructor(private entityService: EntityService) {}

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
      console.log('LOAD ERR', err);
    }

    this.loading = false;
  }

  public addItem(item: IItem) {
    this.itemSelectModal.close(null);

    this.inventory.push({
      itemId: item.id,
      item: item,
      entityId: this.entityId,
      quantity: 1
    });
  }
}
