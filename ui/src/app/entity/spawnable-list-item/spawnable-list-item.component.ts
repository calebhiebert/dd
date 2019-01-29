import { Component, OnInit, Input } from '@angular/core';
import { IEntity } from 'src/app/entity.service';

@Component({
  selector: 'dd-spawnable-list-item',
  templateUrl: './spawnable-list-item.component.html',
  styleUrls: ['./spawnable-list-item.component.css'],
})
export class SpawnableListItemComponent implements OnInit {
  public spawnMode = false;

  @Input()
  public spawnable: IEntity;

  constructor() {}

  ngOnInit() {}

  public spawn(count: number) {
    console.log('Spawning ', count);
  }
}
