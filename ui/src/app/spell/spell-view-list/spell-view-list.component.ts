import { Component, OnInit, Input } from '@angular/core';
import { ISpell } from 'src/app/spell.service';

@Component({
  selector: 'dd-spell-view-list',
  templateUrl: './spell-view-list.component.html',
  styleUrls: ['./spell-view-list.component.css'],
})
export class SpellViewListComponent implements OnInit {
  @Input()
  public spell: ISpell;

  constructor() {}

  ngOnInit() {}

  public get imageURL() {
    if (this.spell.imageId) {
      return `https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/${
        this.spell.imageId
      }`;
    }
  }
}
