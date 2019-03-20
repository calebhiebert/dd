import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IDynamicFieldConfig } from '../form-types';

@Component({
  selector: 'dd-dynamic-validation-errors',
  templateUrl: './dynamic-validation-errors.component.html',
  styleUrls: ['./dynamic-validation-errors.component.css'],
})
export class DynamicValidationErrorsComponent implements OnInit {
  @Input()
  public control: FormControl;

  @Input()
  public config: IDynamicFieldConfig;

  constructor() {}

  ngOnInit() {}

  public get errors() {
    return this.control.errors as any;
  }
}
