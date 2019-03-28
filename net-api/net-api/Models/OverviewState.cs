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
        public Campaign Campaign { get; set; }

        public OverviewState()
        {
            Id = Guid.NewGuid();
        }
    }
}
