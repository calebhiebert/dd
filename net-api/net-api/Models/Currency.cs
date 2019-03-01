﻿using System;
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
    }
}
