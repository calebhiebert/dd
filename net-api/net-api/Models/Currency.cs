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
        public static bool HasResources(CurrencyStore a, CurrencyStore b, bool trackCoins)
        {
            if (!trackCoins)
            {
                return a.Value != null && b.Value != null && a.Value >= b.Value;
            }

            foreach (var coinType in b.Values.Keys.Where(k => b.Values[k] != null))
            {
                var requirement = b.Values[coinType];
                var available = a.Values[coinType];

                var satisfiesRequirement = (requirement == available) || (requirement != null && available != null && available >= requirement);

                if (!satisfiesRequirement)
                {
                    return false;
                }
            }

            return true;
        }

        /// <summary>
        /// Returns a new CurrencyStore that is the result of b subtracted from a
        /// </summary>
        public static CurrencyStore Subtract(CurrencyStore a, CurrencyStore b, bool trackCoins)
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

                foreach (var coinType in b.Values.Keys)
                {
                    var subValue = b.Values[coinType];

                    if (subValue == null)
                    {
                        subValue = 0;
                    }

                    if (a.Values.ContainsKey(coinType))
                    {
                        var v = a.Values[coinType];

                        if (v == null)
                        {
                            v = 0;
                        }

                        newCurrencyStore.Values[coinType] = v - subValue;
                    } else if (subValue != 0)
                    {
                        newCurrencyStore.Values[coinType] = -subValue;
                    }
                }

                // Preserve unaffected values
                foreach (var coinType in a.Values.Keys)
                {
                    if (!newCurrencyStore.Values.ContainsKey(coinType) && a.Values[coinType] != null)
                    {
                        newCurrencyStore.Values.Add(coinType, a.Values[coinType]);
                    }
                }
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

        internal static CurrencyStore Multiply(CurrencyStore currencyCost)
        {
            throw new NotImplementedException();
        }
    }
}
