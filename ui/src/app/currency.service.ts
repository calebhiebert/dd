import { Injectable } from '@angular/core';
import { ICurrencyLevel } from './campaign.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor() {}

  public mapCurrencyValues(currencyMap?: ICurrencyLevel[], amount?: number) {
    if (currencyMap === null || currencyMap === undefined) {
      currencyMap = [{ value: 1, name: 'gp', useInConversions: true }];
    }

    if (amount === null || amount === undefined) {
      amount = 0;
    } else {
      amount *= 100;
    }

    // Sort the currency map with the highest values first
    const sortedCurrencyMap = currencyMap
      .filter((cl) => cl.useInConversions)
      .map((cl) => ({ ...cl, value: cl.value * 100 }))
      .sort((a, b) => {
        return b.value - a.value;
      });

    let results: IMappedCurrency[] = [];

    for (let cl of sortedCurrencyMap) {
      const remainder = amount % cl.value;

      const amt = Math.round(amount - remainder) / cl.value;

      if (amt > 0) {
        results.push({
          name: cl.name,
          amount: amt,
        });
      }

      amount -= amt * cl.value;
      if (amount <= 0) {
        break;
      }
    }

    return results;
  }

  public getCurrencyString(mappedValues: IMappedCurrency[]): string {
    return mappedValues.map((mv) => `${mv.amount}${mv.name}`).join(' ');
  }

  public getCurrencyHTMLString(mappedValues: IMappedCurrency[]): string {
    return mappedValues
      .map((mv) => `${mv.amount}<span class="currency-text">${mv.name}</span>`)
      .join(' ');
  }
}

export interface IMappedCurrency {
  name: string;
  amount: number;
}
