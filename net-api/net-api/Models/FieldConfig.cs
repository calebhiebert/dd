using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class FieldConfig
    {
        [Required]
        [StringLength(30)]
        public string Name { get; set; }

        [StringLength(100)]
        public string Description { get; set; }
        public string ImageId { get; set; }
        public Object DefaultValue { get; set; }

        [Required]
        public FieldType Type { get; set; }
        public FieldConfigOptions Options { get; set; }
    }

    public class FieldConfigOptions
    {
        public bool? Required { get; set; }
        public int? MaxLength { get; set; }
        public int? MinLength { get; set; }
        public string Pattern { get; set; }
        public int? Min { get; set; }
        public int? Max { get; set; }
        public double? Step { get; set; }
        public string[] Choices { get; set; }
        public bool? Simple { get; set; }
        public CurrencyLevel[] CurrencyLevels { get; set; }
        public bool? TrackCoins { get; set; }
    }

    public class FieldValue
    {
        [Required]
        [StringLength(30)]
        public string Name { get; set; }
        public Object Value { get; set; }
    }

    public enum FieldType
    {
        String, Int, Float, Enum, EnumMulti, TextFormatted, Currency, Boolean
    }
}
