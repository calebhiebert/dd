using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class Note
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(40)]
        public string Title { get; set; }

        [Column("Content", TypeName = "JSONB")]
        [JsonIgnore]
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
        public Guid CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        public Guid? QuestId { get; set; }

        public Quest Quest { get; set; }

        public Guid? ArticleId { get; set; }

        public Article Article { get; set; }

        [Required]
        public bool PublicEdit { get; set; }

        [Required]
        public bool PublicView { get; set; }

        [Required]
        public string UserId { get; set; }

        public User User { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        // Data for if a note is positioned on a map
        public Guid? MapId { get; set; }

        public Map Map { get; set; }

        public double? Lat { get; set; }
        public double? Lng { get; set; }

        [JsonIgnore]
        [Column("MapShape", TypeName = "JSONB")]
        public string MapShapeJson { get; set; }

        [NotMapped]
        public MapShape MapShape
        {
            get
            {
                if (MapShapeJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<MapShape>(MapShapeJson);
            }

            set
            {
                MapShapeJson = JsonConvert.SerializeObject(value);
            }
        }

        public Note()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
