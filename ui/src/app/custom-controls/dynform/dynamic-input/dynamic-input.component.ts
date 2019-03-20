import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IDynamicFieldConfig } from '../form-types';

@Component({
  selector: 'dd-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.css'],
})
export class DynamicInputComponent implements OnInit {
  @Input()
  public control: FormControl;

  @Input()
  public config: IDynamicFieldConfig;

  constructor() {}

  ngOnInit() {}
}
