import { Component, OnInit, Input } from '@angular/core';
import { ICurrencyLevel } from 'src/app/campaign.service';
import { CurrencyService, IMappedCurrency } from 'src/app/currency.service';

@Component({
  selector: 'dd-currency-view',
  templateUrl: './currency-view.component.html',
  styleUrls: ['./currency-view.component.css'],
})
export class CurrencyViewComponent implements OnInit {
  @Input()
  public levels: ICurrencyLevel[];

  @Input()
  public currency: { value: number; values: { [key: string]: number } };

  @Input()
  public trackCoins: boolean;

  @Input()
  public blankValue = 'nothing';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    if (!this.levels) {
      throw new Error('Missing levels!');
    }
  }

  public get sortedLevels() {
    if (this.levels) {
      return this.levels.sort((a, b) => {
        return b.value - a.value;
      });
    } else {
      return [];
    }
  }

  public get text() {
    let mapped: IMappedCurrency[];

    if (this.trackCoins === true) {
      mapped = this.currencyService.mapCoinValues(this.sortedLevels, this.currency.values);
    } else {
      mapped = this.currencyService.mapCurrencyValues(this.sortedLevels, this.currency.value);
    }

    if (mapped.length === 0) {
      return `<span class="currency-text">${this.blankValue}</span>`;
    } else {
      return this.currencyService.getCurrencyHTMLString(mapped);
    }
  }
}
