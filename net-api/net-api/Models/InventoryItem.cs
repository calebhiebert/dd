using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace net_api.Models
{
    public class InventoryItem
    {
        [Required]
        [Key]
        public Guid ItemId { get; set; }

        public Item Item { get; set; }

        [Required]
        [Key]
        public Guid EntityId { get; set; }

        [JsonIgnore]
        public Entity Entity { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
