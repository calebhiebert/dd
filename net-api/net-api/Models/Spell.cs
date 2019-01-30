using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace net_api.Models
{
    public class Spell
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        [StringLength(3000)]
        public string Description { get; set; }

        [Required]
        public Guid CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public double? DurationValue { get; set; }
        public DurationType? DurationType { get; set; }

        public double? Range { get; set; }

        public double? Area { get; set; }

        public AreaShape? AreaShape { get; set; }

        [Column("Tags", TypeName = "varchar[]")]
        public string[] Tags { get; set; }
    }

    public enum DurationType
    {
        Instant, Round, Action, BonusAction, Reaction, Second, Minute, Hour, Day
    }

    public enum AreaShape
    {
        Cone, Cube, Cylinder, Line, Sphere, Square
    }
}
