import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IViewField } from 'src/app/entity.service';

@Component({
  selector: 'dd-attribute-table-view',
  templateUrl: './attribute-table-view.component.html',
  styleUrls: ['./attribute-table-view.component.css'],
})
export class AttributeTableViewComponent implements OnInit {
  @Input()
  public fields: IViewField[];

  @Input()
  public editable = false;

  @Output()
  public edit = new EventEmitter<IViewField>();

  constructor() {}

  ngOnInit() {}

  public editField(field: IViewField) {
    this.edit.emit(field);
  }

  public trackField(idx: number, field: IViewField) {
    return field.field.name;
  }
}
