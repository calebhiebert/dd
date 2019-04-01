using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class ConceptEntity
    {
        [Required]
        public Guid ConceptId { get; set; }

        public Concept Concept { get; set; }

        [Required]
        public Guid EntityId { get; set; }

        [JsonIgnore]
        public Entity Entity { get; set; }

        public Guid? ParentConceptId { get; set; }
        public Guid? ParentEntityId { get; set; }

        [JsonIgnore]
        public ConceptEntity Parent { get; set; }

        [Column("Fields", TypeName = "JSONB")]
        [JsonIgnore]
        public string FieldsJson { get; set; }

        [NotMapped]
        [Required]
        public List<Field> Fields
        {
            get
            {
                if (FieldsJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<List<Field>>(FieldsJson);
            }

            set
            {
                FieldsJson = JsonConvert.SerializeObject(value);
            }
        }

        public int? Quantity { get; set; }

        [JsonIgnore]
        [Column("Content", TypeName = "JSONB")]
        public string ContentJson { get; set; }

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
        public int SortValue { get; set; }
    }
}
