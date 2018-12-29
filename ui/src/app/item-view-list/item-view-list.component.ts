import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'dd-item-view-list',
  templateUrl: './item-view-list.component.html',
  styleUrls: ['./item-view-list.component.scss'],
})
export class ItemViewListComponent implements OnInit {
  @Input()
  public item: Item;

  constructor() {}

  ngOnInit() {}

  public get imageURL() {
    if (this.item.imageId) {
      return `https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/${
        this.item.imageId
      }.png`;
    } else {
      return 'https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/uncertainty.png';
    }
  }
}
