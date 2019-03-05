import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'dd-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.css'],
})
export class DynamicFieldComponent extends FieldBaseComponent {
  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
