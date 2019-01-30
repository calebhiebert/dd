using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace net_api.Models
{
    public class InventoryItem
    {
        public Guid Id { get; set; }

        [Required]
        public Guid ItemId { get; set; }
        public Item Item { get; set; }

        [Required]
        public Guid EntityId { get; set; }
        public Entity Entity { get; set; }

        [Required]
        public int Quantity { get; set; }

        public InventoryItem()
        {
            Id = Guid.NewGuid();
        }
    }
}
