using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace net_api.Models
{
    public class Spell
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        [Column("Description", TypeName = "TEXT")]
        public string Description { get; set; }

        public string ImageId { get; set; }

        [Required]
        public bool PlayerVisible { get; set; }

        [Required]
        public Guid CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        [Column("Tags", TypeName = "varchar[]")]
        public string[] Tags { get; set; }
    }
}
