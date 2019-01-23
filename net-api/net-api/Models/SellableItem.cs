using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace net_api.Models
{
    public class SellableItem
    {
        public string Id { get; set; }

        [Required]
        public string ItemId { get; set; }
        public Item Item { get; set; }

        [Required]
        public string ThingOfInterestId { get; set; }
        public ThingOfInterest ThingOfInterest { get; set; }

        [Required]
        public int Quantity { get; set; }

        public double? CurrencyOverride { get; set; }
    }
}
