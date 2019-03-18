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
    }
}
