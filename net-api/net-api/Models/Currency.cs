using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    /// <summary>
    /// Represents a single level of currency
    /// </summary>
    public class CurrencyLevel
    {
        [Required]
        public string Name { get; set; }

        [Range(0.01, double.MaxValue)]
        public double Value { get; set; }

        [Required]
        public bool UseInConversions { get; set; }
    }

    public class CurrencyStore
    {
        public double? Value { get; set; }
        public Dictionary<string, int?> Values { get; set; }

        /// <summary>
        /// Checks to see if the currency a satisfies the requirements of b
        /// </summary>
        public static bool HasResources(CurrencyStore a, CurrencyStore b, CurrencyLevel[] levels, bool trackCoins)
        {
            if (!trackCoins)
            {
                return a.Value != null && b.Value != null && a.Value >= b.Value;
            }

            var requiredAmount = TotalValue(b, levels, trackCoins);
            var availableAmount = TotalValue(a, levels, trackCoins);

            return availableAmount >= requiredAmount;
        }

        /// <summary>
        /// Returns a new CurrencyStore that is the result of b subtracted from a
        /// </summary>
        public static CurrencyStore Subtract(CurrencyStore a, CurrencyStore b, CurrencyLevel[] levels, bool trackCoins)
        {
            var newCurrencyStore = new CurrencyStore();

            if (!trackCoins)
            {
                if (a.Value == null)
                {
                    a.Value = 0;
                }

                if (b.Value == null)
                {
                    b.Value = 0;
                }

                newCurrencyStore.Value = a.Value - b.Value;
            } else
            {
                newCurrencyStore.Values = new Dictionary<string, int?>();

                if (b.Values == null)
                {
                    b.Values = new Dictionary<string, int?>();
                }

                if (a.Values == null)
                {
                    a.Values = new Dictionary<string, int?>();
                }

                var cost = TotalValue(b, levels, trackCoins);
                var availableCurrency = TotalValue(a, levels, trackCoins);

                var remainingCurrency = availableCurrency - cost;

                newCurrencyStore = ValueToCoins(remainingCurrency, levels);
            }

            return newCurrencyStore;
        }

        public static CurrencyStore Multiply(CurrencyStore a, int m)
        {
            var newCurrencyStore = new CurrencyStore();

            if (a.Value != null)
            {
                newCurrencyStore.Value = a.Value * m;
            }

            if (a.Values != null)
            {
                newCurrencyStore.Values = new Dictionary<string, int?>();

                foreach (var coinType in a.Values.Keys)
                {
                    if (a.Values[coinType] != null)
                    {
                        newCurrencyStore.Values.Add(coinType, a.Values[coinType] * m);
                    }
                }
            }

            return newCurrencyStore;
        }

        public static double TotalValue(CurrencyStore currency, CurrencyLevel[] levels, bool trackCoins)
        {
            if (trackCoins)
            {
                if (currency.Values == null)
                {
                    return 0;
                }

                double value = 0;

                foreach (var cl in levels)
                {
                    if (currency.Values.ContainsKey(cl.Name))
                    {
                        value += (double)currency.Values[cl.Name] * cl.Value;
                    }
                }

                return value;
            }
            else
            {
                if (currency.Value == null)
                {
                    return 0;
                } else
                {
                    return (double)currency.Value;
                }
            }
        }

        /// <summary>
        /// Converts a single currency value into it's coin representation
        /// </summary>
        /// <param name="value">the value to convert</param>
        /// <param name="levels">the types of coins that this value can be converted to</param>
        /// <returns></returns>
        public static CurrencyStore ValueToCoins(double value, CurrencyLevel[] levels)
        {
            if (value < 0)
            {
                throw new ArgumentException("value cannot be lower than 0");
            } else if (value == 0)
            {
                return new CurrencyStore();
            }

            var output = new CurrencyStore
            {
                Values = new Dictionary<string, int?>()
            };

            levels = levels.OrderByDescending(l => l.Value).ToArray();

            foreach (var lvl in levels)
            {
                if (value >= lvl.Value)
                {
                    int coinAmount = (int)((value - (value % lvl.Value)) / lvl.Value);
                    output.Values[lvl.Name] = coinAmount;
                    value -= (double)coinAmount * lvl.Value;
                }
            }

            return output;
        }
    }
}
