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

        [Required]
        public string ImageId { get; set; }

        [Required]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        public List<CampaignUser> Members { get; set; }

        [XPTable]
        [Column("ExperienceTable", TypeName = "bigint[]")]
        public long[] ExperienceTable { get; set; }

        [Column("ItemRarityTable", TypeName = "jsonb")]
        [JsonIgnore]
        public string ItemRarityTableJson { get; set; }

        [NotMapped]
        public List<ItemRarity> ItemRarities
        {
            get
            {
                if (ItemRarityTableJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<List<ItemRarity>>(ItemRarityTableJson);
            }

            set
            {
                ItemRarityTableJson = JsonConvert.SerializeObject(value);
            }
        }

        public DateTime CreatedAt { get; set; }
        
        [Required]
        public bool PlayersCanEditItems { get; set; }

        [Required]
        public bool PlayersCanEditSpells { get; set; }

        public List<EntityPreset> EntityPresets { get; set; }

        public List<Entity> Entities { get; set; }

        public List<Item> Items { get; set; }

        public List<Quest> Quests { get; set; }

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

