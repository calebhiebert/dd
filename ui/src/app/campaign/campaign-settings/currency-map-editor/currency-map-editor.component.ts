import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { ICurrencyLevel } from 'src/app/campaign.service';

@Component({
  selector: 'dd-currency-map-editor',
  templateUrl: './currency-map-editor.component.html',
  styleUrls: ['./currency-map-editor.component.css'],
})
export class CurrencyMapEditorComponent implements OnInit {
  public items: FormArray;

  @Input()
  public formGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    this.items = new FormArray(
      [
        { name: 'gp', value: 1.0, useInConversions: true },
        { name: 'cp', value: 0.01, useInConversions: true },
        { name: 'sp', value: 0.1, useInConversions: true },
        { name: 'pp', value: 10.0, useInConversions: false },
      ].map(this.getFormGroup)
    );

    this.formGroup.addControl('currencyMap', this.items);
  }

  private getFormGroup(cl: ICurrencyLevel) {
    return new FormGroup({
      name: new FormControl(cl.name, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      value: new FormControl(cl.value, [
        Validators.required,
        Validators.min(0.01),
      ]),
      useInConversions: new FormControl(cl.useInConversions),
    });
  }

  public get controls() {
    return this.items.controls;
  }
}
