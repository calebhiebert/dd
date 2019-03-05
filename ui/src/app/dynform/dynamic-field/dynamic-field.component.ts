import { Component, OnInit, Input } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'dd-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.css'],
})
export class DynamicFieldComponent extends FieldBaseComponent {
  @Input()
  public showLabel: boolean;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
