import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService, IItem } from 'src/app/item.service';
import { IItemRarity, CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css'],
})
export class ItemViewComponent implements OnInit {
  public loading = false;
  public item: IItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('item_id');

      if (id) {
        this.loadItem(id);
      }
    });
  }

  private async loadItem(id: string) {
    this.loading = true;

    try {
      const item = await this.itemService.getItem(id);
      this.item = item;
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.loading = false;
  }

  public async edit() {
    try {
      await this.router.navigate([
        'campaign',
        'manage',
        this.campaignService.campaign.id,
        'items',
        this.item.id,
        'edit',
      ]);
    } catch (err) {
      console.log(err.name, err.message);
    }
  }

  public get rarity(): IItemRarity {
    if (
      this.campaignService.campaign &&
      this.campaignService.campaign.itemRarities &&
      this.item
    ) {
      return this.campaignService.campaign.itemRarities[this.item.rarity];
    } else {
      return null;
    }
  }

  public get weight(): string {
    if (!this.item) {
      return '';
    }

    if (this.item.weight > 0) {
      return `${this.item.weight}kg`;
    } else {
      return 'Weightless';
    }
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
