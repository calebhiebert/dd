import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CampaignService } from 'src/app/campaign.service';
import { ItemService, IItem } from 'src/app/item.service';

@Component({
  selector: 'dd-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.css'],
})
export class ItemManagerComponent implements OnInit {
  public loading = false;

  private search: string;
  public searchControl: FormControl;
  public page = 1;
  public itemsPerPage = 10;

  public items: IItem[];

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.loadItems();
    this.searchControl = new FormControl(null);

    this.searchControl.valueChanges.subscribe((search: string) => {
      if (!search) {
        this.search = '';
        return;
      }

      this.search = search.trim().toLowerCase();
    });
  }

  private async loadItems() {
    this.loading = true;
    try {
      const items = await this.itemService.getItems(
        this.campaignService.campaign.id
      );
      this.items = items;
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.loading = false;
  }

  public async addItem() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  public selectItem(item: IItem) {
    this.router.navigate([item.id, 'edit'], { relativeTo: this.route });
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

  public get filteredItems(): IItem[] {
    return this.searchedItems.slice(
      this.page * this.itemsPerPage - this.itemsPerPage,
      this.page * this.itemsPerPage
    );
  }
}
