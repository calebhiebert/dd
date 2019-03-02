import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { ICurrencyLevel, ICampaign } from 'src/app/campaign.service';

@Component({
  selector: 'dd-currency-map-editor',
  templateUrl: './currency-map-editor.component.html',
  styleUrls: ['./currency-map-editor.component.css'],
})
export class CurrencyMapEditorComponent implements OnInit {
  public items: FormArray;

  @Input()
  public formGroup: FormGroup;

  @Input()
  public campaign: ICampaign;

  constructor() {}

  ngOnInit() {
    if (this.campaign.currencyMap) {
      this.items = new FormArray(
        this.campaign.currencyMap.map(this.getFormGroup)
      );
    } else {
      this.items = new FormArray(
        [
          { name: 'gp', value: 1.0, useInConversions: true },
          { name: 'cp', value: 0.01, useInConversions: true },
          { name: 'sp', value: 0.1, useInConversions: true },
          { name: 'pp', value: 10.0, useInConversions: false },
        ].map(this.getFormGroup)
      );
    }

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

  public removeCurrencyLevel(idx: number) {
    this.items.removeAt(idx);
  }

  public addCurrencyLevel() {
    this.items.push(
      this.getFormGroup({ name: null, value: null, useInConversions: true })
    );
  }

  public get controls() {
    return this.items.controls;
  }
}
