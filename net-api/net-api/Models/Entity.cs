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
        public Guid Id { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 3)]
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
        public string UserId { get; set; }

        public User User { get; set; }

        [Required]
        public Guid CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        [JsonIgnore]
        [Column("CurrencyAmount", TypeName = "JSONB")]
        public string CurrencyJson { get; set; }

        [NotMapped]
        public CurrencyStore Currency
        {
            get
            {
                if (CurrencyJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<CurrencyStore>(CurrencyJson);
            }

            set
            {
                CurrencyJson = JsonConvert.SerializeObject(value);
            }
        }

        public string ImageId { get; set; }

        [HexColorCodeValidator]
        public string ImageColor1 { get; set; }

        [HexColorCodeValidator]
        public string ImageColor2 { get; set; }

        [Required]
        public bool Spawnable { get; set; }

        public Guid? SpawnedFromId { get; set; }
        public Entity SpawnedFrom { get; set; }

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
        public Guid EntityPresetId { get; set; }
        public EntityPreset Preset { get; set; }

        // For setting the entity's current position
        public Guid? MapId { get; set; }
        [JsonIgnore]
        public Map Map { get; set; }

        public double? Lat { get; set; }
        public double? Lng { get; set; }

        public ICollection<ConceptEntity> EntityConcepts { get; set; }

        public Entity()
        {
            Id = Guid.NewGuid();
        }
    }

    public class Attribute
    {
        public string Name { get; set; }
        public AttributeType Type { get; set; }
        public Object Data { get; set; }
    }

    public class Health
    {
        [Required]
        public double Max { get; set; }

        [Required]
        public double Current { get; set; }

        public Dictionary<int, string> TextDamageLevels { get; set; }
    }
}

