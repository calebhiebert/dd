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
        public Guid Id { get; set; }

        [Required]
        [StringLength(40)]
        public string Title { get; set; }

        [Required]
        [StringLength(3000)]
        public string Text { get; set; }

        [Required]
        public Guid CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        public Guid? QuestId { get; set; }

        [JsonIgnore]
        public Quest Quest { get; set; }

        public Guid? EntityId { get; set; }

        [JsonIgnore]
        public Entity Entity { get; set; }

        public Guid? EntityPresetId { get; set; }

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
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
