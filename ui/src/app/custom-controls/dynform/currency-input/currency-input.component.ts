import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ICurrencyFieldOptions } from '../form-types';
import { ControlValueAccessor, FormArray, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICurrencyLevel } from 'src/app/campaign.service';
import { ICurrency } from 'src/app/entity.service';
import { distinctUntilChanged } from 'rxjs/operators';

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

  private _firstChange = true;

  constructor() {}

  ngOnInit() {
    if (this.config.trackCoins) {
      this.formArray = this.createFormArray(this.config.levels);

      this.formArray.valueChanges
        .pipe(
          distinctUntilChanged((a, b) => {
            if (a === null || a === undefined) {
              return a === b;
            }

            return !a.some((v, idx) => b[idx] !== v);
          })
        )
        .subscribe((val) => {
          if (this._onChange && !this._firstChange) {
            this._onChange({ values: this.convertCurrencyArrayToObject(val, this.config.levels), value: 0 });
          }

          this._firstChange = false;
        });
    } else {
      this.formControl = new FormControl(null);

      this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe((val) => {
        if (this._onChange && !this._firstChange) {
          this._onChange({ values: {}, value: val });
        }

        this._firstChange = false;
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

  private convertCurrencyArrayToObject(values: number[], levels: ICurrencyLevel[]) {
    const obj: { [key: string]: number } = {};

    values.forEach((val, idx) => {
      const lvl = levels[idx];

      if (lvl && lvl.name) {
        obj[lvl.name] = val;
      }
    });

    return obj;
  }

  private mapCurrencyValuesToConfig(values: { [key: string]: number }, levels: ICurrencyLevel[]) {
    if (values === null || values === undefined) {
      values = {};
    }

    return levels.map((lvl) => {
      const val = values[lvl.name];

      if (val) {
        return val;
      } else {
        return 0;
      }
    });
  }

  public reset() {
    if (this._onChange) {
      this._onChange(null);
    }

    if (this.config.trackCoins) {
      this.formArray.patchValue(this.controls.map(() => null), { emitEvent: false });
    } else {
      this.formControl.patchValue(null, { emitEvent: false });
    }
  }

  public writeValue(obj: ICurrency): void {
    if (obj === null || obj === undefined) {
      return;
    }

    if (this.config.trackCoins) {
      this.formArray.setValue(this.mapCurrencyValuesToConfig(obj.values, this.config.levels));
    } else {
      this.formControl.setValue(obj.value);
      this.formControl.markAsPristine();
    }
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
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

  public trackLevel(idx: number) {
    return idx;
  }

  public get levels(): ICurrencyLevel[] {
    return (this.config.levels || [{ name: 'gp', value: 1, useInConversions: true }]).sort((a, b) => b.value - a.value);
  }

  public get controls() {
    if (this.formArray) {
      return this.formArray.controls;
    }
  }

  public get singleInputName() {
    const baseLevel = this.levels.find((lvl) => lvl.value === 1);

    if (baseLevel) {
      return baseLevel.name;
    } else {
      return 'gp';
    }
  }
}
