import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CampaignService } from 'src/app/campaign.service';
import { ItemService, IItem } from 'src/app/item.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'dd-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.css']
})
export class ItemManagerComponent implements OnInit {
  public loading = false;

  public searchControl: FormControl;

  public items: IItem[];
  public totalItemCount: number;

  private queryTags: string[];
  private queryLimit = 10;
  private queryOffset: number;
  private _page = 1;
  private _search: string;

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    // this.loadItems();
    this.searchControl = new FormControl(null);

    this.searchControl.valueChanges
      .pipe(debounceTime(350))
      .subscribe((search: string) => {
        if (!search) {
          this.search = '';
          return;
        }

        this.search = search.trim().toLowerCase();
      });

    this.route.queryParamMap.subscribe(query => {
      if (query.get('tags')) {
        this.queryTags = query
          .get('tags')
          .split(',')
          .map(t => t.trim())
          .filter(t => t !== '' && t !== null && t !== undefined);
      } else {
        this.queryTags = undefined;
      }

      if (query.get('search')) {
        this.searchControl.setValue(query.get('search'));
        this._search = query.get('search');
      }

      if (query.get('limit')) {
        try {
          this.queryLimit = parseInt(query.get('limit'), 10);
        } catch (err) {
          console.log('Limit parse err');
        }
      } else {
        this.queryLimit = 10;
      }

      if (query.get('offset')) {
        try {
          this.queryOffset = parseInt(query.get('offset'), 10);
        } catch (err) {
          console.log('Offset parse err');
        }
      } else {
        this.queryOffset = 0;
      }

      this._page = (this.queryOffset || 0) / (this.queryLimit || 10) + 1;

      this.loadItems();
    });
  }

  private async loadItems() {
    this.loading = true;
    try {
      const items = await this.itemService.getItems(
        this.campaignService.campaign.id,
        this.queryTags,
        this.queryLimit,
        this.queryOffset,
        this.search
      );
      this.items = items.items;
      this.totalItemCount = items.total;
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.loading = false;
  }

  public async addItem() {
    this.router.navigate([
      'campaign',
      'manage',
      this.campaignService.campaign.id,
      'items',
      'create'
    ]);
  }

  public selectItem(item: IItem) {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'items',
      item.id
    ]);
  }

  public get search() {
    return this._search;
  }

  public set search(value: string) {
    this._search = value;

    if (this._search !== '') {
      this.router.navigate(
        ['campaigns', this.campaignService.campaign.id, 'items'],
        {
          queryParams: {
            search: this.search,
            limit: this.queryLimit,
            offset: 0
          },
          queryParamsHandling: 'merge'
        }
      );
    } else {
      this.router.navigate(
        ['campaigns', this.campaignService.campaign.id, 'items'],
        {
          queryParams: {
            search: undefined
          },
          queryParamsHandling: 'merge'
        }
      );
    }
  }

  public get page() {
    return this._page;
  }

  public set page(value: number) {
    this._page = value;

    this.router.navigate(
      ['campaigns', this.campaignService.campaign.id, 'items'],
      {
        queryParams: {
          limit: this.queryLimit,
          offset: this.queryLimit * (this.page - 1)
        },
        queryParamsHandling: 'merge'
      }
    );
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
