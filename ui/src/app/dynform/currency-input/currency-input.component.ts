import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ICurrencyFieldOptions } from '../form-types';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ICurrencyLevel } from 'src/app/campaign.service';
import { ICurrency } from 'src/app/entity.service';

@Component({
  selector: 'dd-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    },
  ],
})
export class CurrencyInputComponent implements OnInit, ControlValueAccessor {
  @Input()
  public config: ICurrencyFieldOptions;

  public formArray: FormArray;
  public formControl: FormControl;

  private _onChange: any;
  private _onTouched: any;

  constructor() {}

  ngOnInit() {
    if (this.config.trackCoins) {
      this.formArray = this.createFormArray(this.config.levels);

      this.formArray.valueChanges.subscribe((val) => {
        if (this._onChange) {
          this._onChange({ values: val, value: 0 });
        }
      });
    } else {
      this.formControl = new FormControl(null);

      this.formControl.valueChanges.subscribe((val) => {
        if (this._onChange) {
          this._onChange({ values: [], value: val });
        }
      });
    }
  }

  private createFormArray(levels: ICurrencyLevel[]) {
    return new FormArray(
      levels.map(() => {
        return new FormControl(null);
      })
    );
  }

  private mapCurrencyValuesToConfig(
    values: { [key: string]: number },
    levels: ICurrencyLevel[]
  ) {
    return levels.map((lvl) => {
      const val = values[lvl.name];

      if (val) {
        return val;
      } else {
        return 0;
      }
    });
  }

  writeValue(obj: ICurrency): void {
    if (obj === null || obj === undefined) {
      return;
    }

    if (this.config.trackCoins) {
      this.formArray.setValue(
        this.mapCurrencyValuesToConfig(obj.values, this.config.levels)
      );
    } else {
      this.formControl.setValue(obj.value);
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.formArray) {
      if (isDisabled) {
        this.formArray.disable();
      } else {
        this.formArray.enable();
      }
    }

    if (this.formControl) {
      if (isDisabled) {
        this.formControl.disable();
      } else {
        this.formControl.enable();
      }
    }
  }

  public get levels(): ICurrencyLevel[] {
    return (
      this.config.levels || [{ name: 'gp', value: 1, useInConversions: true }]
    );
  }

  public get controls() {
    if (this.formArray) {
      return this.formArray.controls;
    }
  }
}
