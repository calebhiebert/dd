using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class EntityPreset
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        [Required]
        public string ImageId { get; set; }

        [Required]
        public bool PlayerCreatable { get; set; }

        [Column("Attributes", TypeName = "jsonb")]
        [JsonIgnore]
        public string AttributeJson { get; set; }

        [NotMapped]
        [Required]
        public List<EntityAttribute> Attributes
        {
            get
            {
                if (AttributeJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<List<EntityAttribute>>(AttributeJson);
            }

            set
            {
                AttributeJson = JsonConvert.SerializeObject(value);
            }
        }

        [Required]
        public bool IsInventoryEnabled { get; set; }

        [Required]
        public bool IsSpellsetsEnabled { get; set; }

        [Required]
        public bool IsCurrencyEnabled { get; set; }

        [Required]
        public bool IsXPEnabled { get; set; }

        [Required]
        [Column("ConceptTypesEnabled", TypeName = "UUID[]")]
        public Guid[] ConceptTypesEnabled { get; set; }

        [Required]
        public bool IsHealthEnabled { get; set; }

        [Column("Health", TypeName = "jsonb")]
        [JsonIgnore]
        public string HealthJson { get; set; }

        [NotMapped]
        public HealthPreset Health
        {
            get
            {
                if (HealthJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<HealthPreset>(HealthJson);
            }

            set
            {
                HealthJson = JsonConvert.SerializeObject(value);
            }
        }

        [Required]
        public Guid CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        public EntityPreset()
        {
            Id = Guid.NewGuid();
        }
    }

    public class EntityAttribute
    {
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Name { get; set; }

        [StringLength(150, MinimumLength = 3)]
        public string Description { get; set; }

        public string ImageId { get; set; }

        public string DefaultValue { get; set; }

        [Required]
        public AttributeType Type { get; set; }

        [Column("Options", TypeName = "varchar[]")]
        public string[] Options { get; set; }

        [Required]
        public AttributeClass Class { get; set; }

        [Required]
        public bool Required { get; set; }

        public double? Max { get; set; }

        public double? Min { get; set; }
    }

    public class HealthPreset
    {
        [Required]
        public HealthType Type { get; set; }

        public HealthColorType ColorType { get; set; }


        [HexColorCodeValidator]
        public string StaticColor { get; set; }

        [Required]
        public bool AmountHidden { get; set; }

        public double[] Bars { get; set; }
    }

    public enum AttributeType
    {
        String, Number, Enum, BigText, SelectMulti
    }

    public enum AttributeClass
    {
        Major, Normal, Minor, Unimportant
    }

    public enum HealthType
    {
        Normal, MultiBar
    }

    public enum HealthColorType
    {
        Dynamic, Static
    }
}
