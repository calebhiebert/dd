using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class Map
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public bool PlayerVisible { get; set; }

        [Required]
        public MapStatus Status { get; set; }

        public int? MinZoom { get; set; }
        public int? MaxZoom { get; set; }

        [Required]
        public Guid CampaignId { get; set; }
        
        [JsonIgnore]
        public Campaign Campaign { get; set; }

        [Required]
        public string UserId { get; set; }

        public User User { get; set; }

        [Column("Mapping", TypeName = "jsonb")]
        [JsonIgnore]
        public string MappingJson { get; set; }

        [NotMapped]
        public Dictionary<string, ulong[]> Mapping
        {
            get
            {
                if (MappingJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<Dictionary<string, ulong[]>>(MappingJson);
            }

            set
            {
                MappingJson = JsonConvert.SerializeObject(value);
            }
        }
    }

    public enum MapStatus { Processing, Processed }
}
