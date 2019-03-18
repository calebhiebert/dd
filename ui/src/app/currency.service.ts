import { Injectable } from '@angular/core';
import { ICurrencyLevel } from './campaign.service';
import { ICurrency } from './entity.service';

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

    const results: IMappedCurrency[] = [];

    for (const cl of sortedCurrencyMap) {
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

  public mapCoinValues(currencyMap?: ICurrencyLevel[], values?: { [key: string]: number }) {
    if (!values) {
      values = {};
    }

    if (currencyMap === null || currencyMap === undefined) {
      currencyMap = [{ value: 1, name: 'gp', useInConversions: true }];
    }

    const sortedCurrencyMap = currencyMap
      .map((cl) => ({ ...cl, value: cl.value * 100 }))
      .sort((a, b) => {
        return b.value - a.value;
      });

    const results: IMappedCurrency[] = [];

    for (const lvl of sortedCurrencyMap) {
      const value = values[lvl.name];

      if (value) {
        results.push({
          name: lvl.name,
          amount: value,
        });
      }
    }

    return results;
  }

  /**
   * Checks to see if the currency a satisfies the requirements of currency b
   */
  public hasResources(a: ICurrency, b: ICurrency, trackCoins: boolean): boolean {
    if (a === null || a === undefined || b === undefined || b === null) {
      return false;
    }

    // Using simple currency mode
    if (!trackCoins) {
      return a.value !== null && a.value !== undefined && a.value >= b.value;
    }

    // Make sure a has values set
    if (a.values === null || a.values === undefined || b.values === null || b.values === undefined) {
      return false;
    }

    for (const rct of Object.keys(b.values)) {
      const requiredAmount = b.values[rct];
      const availableAmount = a.values[rct];

      let satisfiesRequirements;

      if (availableAmount === null || availableAmount === undefined) {
        satisfiesRequirements = false;
      } else {
        satisfiesRequirements = availableAmount >= requiredAmount;
      }

      if (!satisfiesRequirements) {
        return false;
      }
    }

    return true;
  }

  /**
   * Returns a new currency that is the result of b subtracted from a
   */
  public subtract(a: ICurrency, b: ICurrency, trackCoins: boolean): ICurrency {
    if (!trackCoins) {
      return {
        value: a.value - b.value,
        values: null,
      };
    } else {
      if (!a.values) {
        a.values = {};
      }

      if (!b.values) {
        b.values = {};
      }

      const currency: ICurrency = {
        value: null,
        values: {},
      };

      for (const coinType of Object.keys(b)) {
        if (a.values[coinType]) {
          currency.values[coinType] = a.values[coinType] - b.values[coinType];
        } else {
          currency.values[coinType] = -b.values[coinType];
        }
      }

      return currency;
    }
  }

  public getCurrencyString(mappedValues: IMappedCurrency[]): string {
    return mappedValues.map((mv) => `${mv.amount}${mv.name}`).join(' ');
  }

  public getCurrencyHTMLString(mappedValues: IMappedCurrency[]): string {
    return mappedValues.map((mv) => `${mv.amount}<span class="currency-text">${mv.name}</span>`).join(' ');
  }
}

export interface IMappedCurrency {
  name: string;
  amount: number;
}
