using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class ConceptType
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(30)]
        public string Name { get; set; }

        [Required]
        [StringLength(32)]
        public string PluralForm { get; set; }

        [StringLength(100)]
        public string Description { get; set; }

        [Required]
        public string UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        public string Icon { get; set; }

        [Required]
        public bool PlayerEditable { get; set; }

        [Column("Fields", TypeName = "JSONB")]
        [JsonIgnore]
        public string FieldJson { get; set; }

        [NotMapped]
        [Required]
        public List<ConceptFieldConfig> Fields
        {
            get
            {
                if (FieldJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<List<ConceptFieldConfig>>(FieldJson);
            }

            set
            {
                FieldJson = JsonConvert.SerializeObject(value);
            }
        }

        [Column("EntityConfig", TypeName = "JSONB")]
        [JsonIgnore]
        public string EntityConfigJson { get; set; }

        [NotMapped]
        [Required]
        public ConceptEntityConfig EntityConfig
        {
            get
            {
                if (EntityConfigJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<ConceptEntityConfig>(EntityConfigJson);
            }

            set
            {
                EntityConfigJson = JsonConvert.SerializeObject(value);
            }
        }

        [Required]
        public Guid CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        public ConceptType()
        {
            Id = Guid.NewGuid();
        }
    }

    public class ConceptFieldConfig : FieldConfig { }
}
