using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    /// <summary>
    /// Represents a single level of currency
    /// </summary>
    public class CurrencyLevel
    {
        public string Name { get; set; }

        public double Value { get; set; }

        public bool UseInConversions { get; set; }
    }

    public class CurrencyStore
    {
        public double? Value { get; set; }
        public Dictionary<string, int?> Values { get; set; }
    }
}
