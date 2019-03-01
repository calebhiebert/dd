using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        [JsonIgnore]
        [Column("Content", TypeName = "JSONB")]
        public string ContentJson { get; set; }

        [NotMapped]
        public Object Content
        {
            get
            {
                if (ContentJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject(ContentJson);
            }

            set
            {
                ContentJson = JsonConvert.SerializeObject(value);
            }
        }
    }
}
