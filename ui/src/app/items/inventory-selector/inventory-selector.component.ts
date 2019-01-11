import {
  Component,
  OnInit,
  ViewChild,
  AfterContentInit,
  Input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { ModalComponent } from 'src/app/modal/modal.component';
import { ItemService, IItem } from 'src/app/item.service';
import { CampaignService } from 'src/app/campaign.service';
import { numberValidator } from 'src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component';
import { EntityPreset } from 'src/app/entity';
import { InventoryItem } from 'src/app/inventory';

@Component({
  selector: 'dd-inventory-selector',
  templateUrl: './inventory-selector.component.html',
  styleUrls: ['./inventory-selector.component.scss'],
})
export class InventorySelectorComponent implements OnInit, AfterContentInit {
  @ViewChild('itemselector')
  public itemSelector: ModalComponent<IItem>;

  @ViewChild('itemedit')
  public itemEditor: ModalComponent<any>;

  @ViewChild('confirm')
  public confirmation: ConfirmationModalComponent;

  @Input()
  public entityPreset: EntityPreset;

  @Input()
  public formGroup: FormGroup;

  public itemEditorGroup: FormGroup;

  public selectedItems: InventoryItem[];

  public currentItem: InventoryItem;

  constructor(
    private itemService: ItemService,
    private sanitizer: DomSanitizer,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.formGroup.addControl(
      'inventory',
      new FormGroup({
        items: new FormArray(
          this.entityPreset.inventory.items.map((i) => this.createControl(i))
        ),
      })
    );

    this.itemEditorGroup = new FormGroup({
      quantity: new FormControl(1, [Validators.required, numberValidator]),
    });

    this.selectedItems = [];
  }

  public createControl(i: InventoryItem): FormControl {
    return new FormControl(i.item.id, [Validators.required]);
  }

  public selectItem(item: InventoryItem) {
    this.currentItem = item;
    this.itemEditorGroup.setValue({ quantity: item.quantity });
    this.itemEditor.open();
  }

  ngAfterContentInit(): void {}

  public async addItem() {
    this.itemSelector.open().then((item: IItem) => {
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