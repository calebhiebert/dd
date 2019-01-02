import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { Item } from '../item';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'dd-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.css'],
})
export class ItemManagerComponent implements OnInit {
  private search: string;
  public searchControl: FormControl;
  public page: number = 1;
  public itemsPerPage = 10;

  public creatingItem = false;

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.searchControl = new FormControl(null);

    this.searchControl.valueChanges.subscribe((search: string) => {
      if (!search) {
        this.search = '';
        return;
      }

      this.search = search.trim().toLowerCase();
    });
  }

  public async addItem() {
    this.creatingItem = true;

    try {
      const item: Item = {
        id: null,
        name: '--_blank_--',
        description: '--_blank_--',
        imageId: 'uncertainty',
        attributes: [],
      };

      const id = await this.itemService.createItem();
      this.router.navigate([id, 'edit'], { relativeTo: this.route });
    } catch (err) {
      console.log('ADD ERR', err);
    }

    this.creatingItem = false;
  }

  public selectItem(item: Item) {
    this.router.navigate([item.id, 'edit'], { relativeTo: this.route });
  }

  public get items() {
    return this.campaignService.campaign.items;
  }

  public get searchedItems() {
    if (this.search && this.search !== '') {
      return this.items.slice().filter((i) => {
        return (
          i.name.toLowerCase().indexOf(this.search) !== -1 ||
          i.description.toLowerCase().indexOf(this.search) !== -1
        );
      });
    } else {
      return this.items;
    }
  }

  public get filteredItems(): Item[] {
    return this.searchedItems.slice(
      this.page * this.itemsPerPage - this.itemsPerPage,
      this.page * this.itemsPerPage
    );
  }
}
