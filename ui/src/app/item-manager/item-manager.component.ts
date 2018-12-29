import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ViewChild,
} from '@angular/core';
import { CampaignService } from '../campaign.service';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dd-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.css'],
})
export class ItemManagerComponent implements OnInit {
  constructor(
    private campaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit() {}

  public selectItem(item: Item) {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'items',
      item.id,
      'edit',
    ]);
  }

  public get items() {
    return this.campaignService.campaign.items;
  }
}
