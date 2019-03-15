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
  public modifiers: IViewField[] = [];

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

  public getModifiers(id: string) {
    return this.modifiers.filter((m) => m.config && m.config.options && m.config.options.modifierFor === id);
  }

  public getModifierString(modifiers: IViewField[]) {
    return modifiers.map((m) => m.field.value).join(' ');
  }
}
