import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CampaignService } from 'src/app/campaign.service';
import { ItemService, IItem } from 'src/app/item.service';
import { debounceTime, distinct, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'dd-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.css'],
})
export class ItemManagerComponent implements OnInit {
  public loading = false;

  public searchControl: FormControl;

  public items: IItem[];
  public totalItemCount: number;
  public queryLimit = 10;
  public tags: string[];

  private _queryOffset: number;
  private _page = 1;
  private _search: string;

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.readURLParams();

    this.searchControl = new FormControl(this.search);

    this.searchControl.valueChanges
      .pipe(debounceTime(350))
      .subscribe((search: string) => {
        if (!search) {
          this.search = '';
          return;
        }

        this.search = search.trim().toLowerCase();
      });

    this.loadItems(false);
  }

  private readURLParams() {
    const query = this.route.snapshot.queryParamMap;

    if (query.get('search')) {
      this._search = query.get('search');
    }

    if (query.get('limit')) {
      try {
        this.queryLimit = parseInt(query.get('limit'), 10);
      } catch (err) {
        // Do nothing
      }
    } else {
      this.queryLimit = 10;
    }

    if (query.get('offset')) {
      try {
        this._queryOffset = parseInt(query.get('offset'), 10);
      } catch (err) {
        // Do nothing
      }
    } else {
      this._queryOffset = 0;
    }

    this._page = (this._queryOffset || 0) / (this.queryLimit || 10) + 1;
  }

  private async loadItems(navigate: boolean = true) {
    this.loading = true;

    if (navigate) {
      await this.writeURLParams();
    }

    try {
      const items = await this.itemService.getItems(
        this.campaignService.campaign.id,
        this.queryLimit,
        this._queryOffset,
        this.search
      );
      this.items = items.items;
      this.totalItemCount = items.total;
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  private async loadTags() {
    try {
      this.tags = await this.itemService.getTags(
        this.campaignService.campaign.id
      );
    } catch (err) {
      throw err;
    }
  }

  private async writeURLParams() {
    const queryObj: { [key: string]: string } = {
      limit: this.queryLimit.toString(),
      offset: (this.queryLimit * (this.page - 1)).toString(),
    };

    if (this.search && this.search.trim() !== '') {
      queryObj.search = this.search;
    }

    await this.router.navigate(
      ['campaigns', this.campaignService.campaign.id, 'items'],
      {
        queryParams: queryObj,
        replaceUrl: true,
      }
    );
  }

  public async addItem() {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'items',
      'create',
    ]);
  }

  public selectItem(item: IItem) {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'items',
      item.id,
    ]);
  }

  public get search() {
    return this._search;
  }

  public set search(value: string) {
    this._search = value;

    // Setting the page triggers a refetch
    this.page = 1;
  }

  public get page() {
    return this._page;
  }

  public set page(value: number) {
    this._page = value;
    this._queryOffset = this.queryLimit * (this.page - 1);
    this.loadItems();
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
