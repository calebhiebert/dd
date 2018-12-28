import { Component } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ui';

  public item: Item;

  constructor() {
    this.item = new Item();
    this.item.name = 'Sword of Swordliness';
    this.item.description =
      "Just a sword, it's sharp, made of metal. Neat stuff";
  }
}
