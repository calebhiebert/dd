import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ViewChild,
} from '@angular/core';
import { CampaignService } from '../campaign.service';
import { Item } from '../item';
import { ItemFormComponent } from '../item-form/item-form.component';
import { debounceTime } from 'rxjs/operators';
import { AttributeCollection } from '../attributes';
import { ItemService } from '../item.service';

@Component({
  selector: 'dd-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.css'],
})
export class ItemManagerComponent implements OnInit {
  public expandedItemId: string = null;
  public saving = false;
  public savedTime: Date = null;

  @ViewChild('iform')
  private set form(form: ItemFormComponent) {
    this.savedTime = null;

    if (form !== undefined) {
      form.formGroup.valueChanges.pipe(debounceTime(500)).subscribe((vc) => {
        this.saveItem(vc);
      });
    }
  }

  constructor(
    private campaignService: CampaignService,
    private itemService: ItemService
  ) {}

  ngOnInit() {}

  public selectItem(item: Item) {
    if (item.id === this.expandedItemId) {
      this.expandedItemId = null;
    } else {
      this.expandedItemId = item.id;
    }
  }

  public async saveItem(item: any) {
    this.saving = true;
    this.savedTime = null;
    const newItem = new Item();
    newItem.attributes = <AttributeCollection>{ attributes: item };
    newItem.description = item.description;
    newItem.name = item.name;
    newItem.imageId = item.imageId;
    newItem.id = this.expandedItemId;

    try {
      await this.itemService.saveItem(newItem);
    } catch (err) {
      console.log('SAVE ERR', err);
    }

    this.saving = false;
    this.savedTime = new Date();
  }

  public get items() {
    return this.campaignService.campaign.items;
  }
}
