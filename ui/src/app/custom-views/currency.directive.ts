import { Directive, Input, HostBinding } from '@angular/core';
import { CurrencyService, IMappedCurrency } from '../currency.service';
import { CampaignService } from '../campaign.service';

@Directive({
  selector: '[ddCurrency]',
})
export class CurrencyDirective {
  // tslint:disable-next-line: no-input-rename
  @Input('ddCurrency')
  public currency: { value: number; values: { [key: string]: number } };

  @Input()
  public blankValue = 'nothing';

  constructor(private currencyService: CurrencyService, private campaignService: CampaignService) {}

  public get sortedLevels() {
    if (this.levels) {
      return this.levels.sort((a, b) => {
        return b.value - a.value;
      });
    } else {
      return [];
    }
  }

  @HostBinding('innerHTML')
  public get text() {
    if (!this.currency) {
      return `<span class="currency-text">${this.blankValue}</span>`;
    }

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

  public get levels() {
    return this.campaignService.campaign.currencyMap || [{ value: 1, name: 'gp', useInConversions: true }];
  }

  public get trackCoins() {
    return this.campaignService.campaign.trackCoins;
  }
}
