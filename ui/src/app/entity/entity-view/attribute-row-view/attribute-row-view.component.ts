import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { IViewField } from 'src/app/entity.service';

@Component({
  selector: 'dd-attribute-row-view',
  templateUrl: './attribute-row-view.component.html',
  styleUrls: ['./attribute-row-view.component.css'],
})
export class AttributeRowViewComponent implements OnInit {
  @Input()
  public fields: IViewField[];

  @Input()
  public mode = 'major';

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
