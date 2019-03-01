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
        { name: 'gp', value: 1 },
        { name: 'cp', value: 0.01 },
        { name: 'sp', value: 0.1 },
        { name: 'pp', value: 10 },
      ].map(this.getFormGroup)
    );
    this.controls[0].get('value').disable();

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
    });
  }

  public get controls() {
    return this.items.controls;
  }
}
