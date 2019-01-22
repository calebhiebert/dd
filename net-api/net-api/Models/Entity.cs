using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace net_api.Models
{
    public class Entity
    {
        public string Id { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string UserId { get; set; }

        public User User { get; set; }

        [Required]
        public string CampaignId { get; set; }

        public double? Currency { get; set; }

        public string ImageId { get; set; }

        [HexColorCodeValidator]
        public string ImageColor1 { get; set; }

        [HexColorCodeValidator]
        public string ImageColor2 { get; set; }

        [Required]
        public bool Spawnable { get; set; }

        [Column("Attributes", TypeName = "jsonb")]
        [JsonIgnore]
        public string AttributesJson { get; set; }

        [NotMapped]
        public List<Attribute> Attributes
        {
            get
            {
                if (AttributesJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<List<Attribute>>(AttributesJson);
            }

            set
            {
                AttributesJson = JsonConvert.SerializeObject(value);
            }
        }

        [Column("Health", TypeName = "jsonb")]
        [JsonIgnore]
        public string HealthJson { get; set; }

        [NotMapped]
        public Health Health
        {
            get
            {
                if (HealthJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<Health>(HealthJson);
            }

            set
            {
                HealthJson = JsonConvert.SerializeObject(value);
            }
        }

        [Range(0, long.MaxValue)]
        public long? XP { get; set; }

        [Required]
        public string EntityPresetId { get; set; }
        public EntityPreset Preset { get; set; }

        public ICollection<InventoryItem> InventoryItems { get; set; }
    }

    public class Attribute
    {
        public string Name { get; set; }
        public AttributeType Type { get; set; }
        public string Data { get; set; }
    }

    public class Health
    {
        [Required]
        public double Max { get; set; }

        [Required]
        public double Current { get; set; }

        public double[] Bars { get; set; }
    }
}

