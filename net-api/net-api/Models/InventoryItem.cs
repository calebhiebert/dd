using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace net_api.Models
{
    public class InventoryItem
    {
        public string Id { get; set; }

        [Required]
        public string ItemId { get; set; }
        public Item Item { get; set; }

        [Required]
        public string EntityId { get; set; }
        public Entity Entity { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
