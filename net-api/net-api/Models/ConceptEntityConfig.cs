using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class ConceptEntityConfig
    {
        [Required]
        public bool Enabled { get; set; }

        [Required]
        public bool EnableQuantity { get; set; }

        [Column("Fields", TypeName = "JSONB")]
        [JsonIgnore]
        public string FieldJson { get; set; }

        [NotMapped]
        [Required]
        public List<ConceptEntityFieldConfig> Fields
        {
            get
            {
                if (FieldJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<List<ConceptEntityFieldConfig>>(FieldJson);
            }

            set
            {
                FieldJson = JsonConvert.SerializeObject(value);
            }
        }
    }

    public class ConceptEntityFieldConfig : FieldConfig { }
}
