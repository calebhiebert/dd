import { Component, OnInit, Input } from '@angular/core';
import { IItem } from 'src/app/item.service';
import { CampaignService, IItemRarity } from 'src/app/campaign.service';

@Component({
  selector: 'dd-item-view-list',
  templateUrl: './item-view-list.component.html',
  styleUrls: ['./item-view-list.component.scss'],
})
export class ItemViewListComponent implements OnInit {
  @Input()
  public item: IItem;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public get imageURL() {
    if (this.item.imageId) {
      return `https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/${
        this.item.imageId
      }`;
    } else {
      return 'https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/uncertainty';
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
}
