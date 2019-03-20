import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'dd-dynamic-field-horizontal',
  templateUrl: './dynamic-field-horizontal.component.html',
  styleUrls: ['./dynamic-field-horizontal.component.css'],
})
export class DynamicFieldHorizontalComponent extends FieldBaseComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
