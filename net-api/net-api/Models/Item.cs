using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace net_api.Models
{
    public class Item
    {
        public string Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        [StringLength(3000, MinimumLength = 3)]
        public string Description { get; set; }

        public string ImageId { get; set; }

        [Required]
        public string CampaignId { get; set; }

        [Required]
        public bool PlayerVisible { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        [Required]
        [Range(-1, int.MaxValue)]
        public int Rarity { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double Cost { get; set; }

        [Required]
        public double Weight { get; set; }

        [Column("Tags", TypeName = "varchar[]")]
        public string[] Tags { get; set; }
    }

    public class ItemType
    {
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        public string ImageId { get; set; }
    }

    public class ItemRarity
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [HexColorCodeValidator]
        public string Color { get; set; }
    }
}
