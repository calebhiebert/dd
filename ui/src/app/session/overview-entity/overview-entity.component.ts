import { Component, OnInit, Input } from '@angular/core';
import { IEntity } from 'src/app/entity.service';

@Component({
  selector: 'dd-overview-entity',
  templateUrl: './overview-entity.component.html',
  styleUrls: ['./overview-entity.component.css']
})
export class OverviewEntityComponent implements OnInit {
  @Input()
  public entity: IEntity;

  constructor() {}

  ngOnInit() {}
}
