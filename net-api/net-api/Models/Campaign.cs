using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace net_api.Models
{
    public class Campaign
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [Column("Content", TypeName = "JSONB")]
        public string ContentJson { get; set; }

        [JsonIgnore]
        [NotMapped]
        public Delta Content
        {
            get
            {
                if (ContentJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<Delta>(ContentJson);
            }

            set
            {
                ContentJson = JsonConvert.SerializeObject(value);
            }
        }

        [Required]
        public string ImageId { get; set; }

        [Required]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        public List<CampaignUser> Members { get; set; }

        [XPTable]
        [Column("ExperienceTable", TypeName = "bigint[]")]
        public long[] ExperienceTable { get; set; }

        [Column("CurrencyMap", TypeName = "JSONB")]
        [JsonIgnore]
        public string CurrencyMapJson { get; set; }

        [NotMapped]
        public List<CurrencyLevel> CurrencyMap
        {
            get
            {
                if (CurrencyMapJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<List<CurrencyLevel>>(CurrencyMapJson);
            }

            set
            {
                foreach (var cl in value)
                {
                    cl.Value = Math.Round(cl.Value, 2, MidpointRounding.AwayFromZero);
                }

                CurrencyMapJson = JsonConvert.SerializeObject(value);
            }
        }

        public Guid? OverviewStateId { get; set; }
        public OverviewState OverviewState { get; set; }

        public bool TrackCoins { get; set; }

        public DateTime CreatedAt { get; set; }

        public List<EntityPreset> EntityPresets { get; set; }

        public List<Entity> Entities { get; set; }

        public List<Quest> Quests { get; set; }

        public List<ConceptType> ConceptTypes { get; set; }

        [JsonIgnore]
        public List<CampaignInvite> Invites { get; set; }

        public Campaign()
        {
            Members = new List<CampaignUser>();
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
        }
    }
}

