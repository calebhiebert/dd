using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class OverviewState
    {
        public Guid Id { get; set; }

        [JsonIgnore]
        [Required]
        [Column("EntitySortOrder", TypeName = "JSONB")]
        public string EntitySortOrderJson { get; set; }

        [NotMapped]
        public Dictionary<Guid, int> EntitySortOrder
        {
            get
            {
                if (EntitySortOrderJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<Dictionary<Guid, int>>(EntitySortOrderJson);
            }

            set
            {
                EntitySortOrderJson = JsonConvert.SerializeObject(value);
            }
        }

        [JsonIgnore]
        [Required]
        [Column("EntityLabels", TypeName = "JSONB")]
        public string EntityLabelsJson { get; set; }

        [NotMapped]
        public Dictionary<Guid, string> EntityLabels
        {
            get
            {
                if (EntityLabelsJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<Dictionary<Guid, string>>(EntityLabelsJson);
            }

            set
            {
                EntityLabelsJson = JsonConvert.SerializeObject(value);
            }
        }

        [JsonIgnore]
        [Required]
        [Column("EntityConcepts", TypeName = "JSONB")]
        public string EntityConceptsJson { get; set; }

        [NotMapped]
        public Dictionary<Guid, Dictionary<Guid, Guid[]>> EntityConcepts
        {
            get
            {
                if (EntityConceptsJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<Dictionary<Guid, Dictionary<Guid, Guid[]>>>(EntityConceptsJson);
            }

            set
            {
                EntityConceptsJson = JsonConvert.SerializeObject(value);
            }
        }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        public OverviewState()
        {
            Id = Guid.NewGuid();
        }
    }
}
