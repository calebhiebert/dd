import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IItem, ItemService } from 'src/app/item.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.css'],
})
export class ItemSelectComponent implements OnInit {
  public loading = false;
  public items: IItem[];

  public searchControl: FormControl;

  @Output()
  public selected = new EventEmitter<IItem>();

  private _search: string;

  constructor(
    private itemService: ItemService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.searchControl = new FormControl(null);

    this.searchControl.valueChanges
      .pipe(debounceTime(250))
      .subscribe((search) => {
        this._search = search;
        this.loadItems();
      });

    this.loadItems();
  }

  private async loadItems() {
    this.loading = true;

    try {
      const items = await this.itemService.getItems(
        this.campaignService.campaign.id,
        null,
        6,
        0,
        this._search
      );

      this.items = items.items;
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public selectItem(item: IItem) {
    this.selected.emit(item);
  }
}
