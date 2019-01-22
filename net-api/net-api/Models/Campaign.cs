using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace net_api.Models
{
    public class Campaign
    {
        public Campaign()
        {
            Members = new List<CampaignUser>();
        }

        public string Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ImageId { get; set; }

        [Required]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        public ICollection<CampaignUser> Members { get; set; }

        [XPTable]
        [Column("ExperienceTable", TypeName = "bigint[]")]
        public long[] ExperienceTable { get; set; }

        public ICollection<EntityPreset> EntityPresets { get; set; }

        public ICollection<Entity> Entities { get; set; }

        public ICollection<Item> Items { get; set; }

        public ICollection<Quest> Quests { get; set; }

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
    }
}

