import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalComponent } from '../modal/modal.component';
import { InventoryItem } from '../inventory';
import { ItemService } from '../item.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { Item } from '../item';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'dd-inventory-selector',
  templateUrl: './inventory-selector.component.html',
  styleUrls: ['./inventory-selector.component.scss'],
})
export class InventorySelectorComponent implements OnInit, AfterContentInit {
  @ViewChild('itemselector')
  public itemSelector: ModalComponent<Item>;

  @ViewChild('itemedit')
  public itemEditor: ModalComponent<any>;

  @ViewChild('confirm')
  public confirmation: ConfirmationModalComponent;

  public itemEditorGroup: FormGroup;

  public selectedItems: InventoryItem[];

  public currentItem: InventoryItem;

  constructor(
    private itemService: ItemService,
    private sanitizer: DomSanitizer,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.itemEditorGroup = new FormGroup({
      quantity: new FormControl(1, Validators.required),
    });

    this.selectedItems = [];

    Promise.all(['3', '2', '3'].map((id) => this.itemService.getItem(id))).then(
      (items) => {
        items.forEach((i) => {
          this.selectedItems.push({
            quantity: 1,
            item: i,
          });
        });
      }
    );

    this.itemEditorGroup.valueChanges.subscribe((v) => {
      this.currentItem.quantity = v.quantity;
    });
  }

  public selectItem(item: InventoryItem) {
    this.currentItem = item;
    this.itemEditorGroup.setValue({ quantity: item.quantity });
    this.itemEditor.open();
  }

  ngAfterContentInit(): void {}

  public async addItem() {
    this.itemSelector.open().then((item: Item) => {
      if (item !== undefined) {
        this.selectedItems.push({
          quantity: 1,
          item: item,
        });
      }
    });
  }

  public async removeItem() {
    const currentItem = this.currentItem;
    this.itemEditor.close(null);

    if (
      await this.confirmation.getConfirmation(
        'Are you sure you want to remove this item?'
      )
    ) {
      console.log('removing item', this.currentItem);
      this.selectedItems = this.selectedItems.filter(
        (i) => i !== this.currentItem
      );
    } else {
      this.selectItem(currentItem);
    }
  }

  public imageSource(id: string): string {
    return `https://res.cloudinary.com/dqhk8k6iv/image/upload/t_blurred_bg/${id}.png`;
  }

  public backgroundCSS(imageId: string) {
    return this.sanitizer.bypassSecurityTrustStyle(
      `url("${this.imageSource(
        imageId
      )}"), linear-gradient(to top, black 0%, black 100%)`
    );
  }

  public get items() {
    return this.campaignService.campaign.items;
  }
}
