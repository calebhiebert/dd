using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class Note
    {
        public string Id { get; set; }

        [Required]
        [StringLength(40)]
        public string Title { get; set; }

        [Required]
        [StringLength(3000)]
        public string Text { get; set; }

        [Required]
        public string CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        public string QuestId { get; set; }

        [JsonIgnore]
        public Quest Quest { get; set; }

        public string EntityId { get; set; }

        [JsonIgnore]
        public Entity Entity { get; set; }

        public string EntityPresetId { get; set; }

        [JsonIgnore]
        public EntityPreset EntityPreset { get; set; }

        [Required]
        public bool PublicEdit { get; set; }

        [Required]
        public bool PublicView { get; set; }

        public string UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public Note()
        {
            Id = Nanoid.Nanoid.Generate();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
