using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace net_api.Models
{
    public class SellableItem
    {
        public Guid Id { get; set; }

        [Required]
        public Guid ItemId { get; set; }
        public Item Item { get; set; }

        [Required]
        public Guid ThingOfInterestId { get; set; }
        public ThingOfInterest ThingOfInterest { get; set; }

        [Required]
        public int Quantity { get; set; }

        public double? CurrencyOverride { get; set; }
    }
}
