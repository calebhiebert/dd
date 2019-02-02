import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IViewAttribute } from 'src/app/entity.service';

@Component({
  selector: 'dd-attribute-table-view',
  templateUrl: './attribute-table-view.component.html',
  styleUrls: ['./attribute-table-view.component.css'],
})
export class AttributeTableViewComponent implements OnInit {
  @Input()
  public attributes: IViewAttribute[];

  @Input()
  public editable = false;

  @Output()
  public edit = new EventEmitter<IViewAttribute>();

  constructor() {}

  ngOnInit() {}

  public editAttribute(attribute: IViewAttribute) {
    this.edit.emit(attribute);
  }

  public trackAttribute(idx: number, attribute: IViewAttribute) {
    return attribute.attr.name;
  }
}
