import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { IViewAttribute } from 'src/app/entity.service';

@Component({
  selector: 'dd-attribute-row-view',
  templateUrl: './attribute-row-view.component.html',
  styleUrls: ['./attribute-row-view.component.css'],
})
export class AttributeRowViewComponent implements OnInit {
  @Input()
  public attributes: IViewAttribute[];

  @Input()
  public mode = 'major';

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
