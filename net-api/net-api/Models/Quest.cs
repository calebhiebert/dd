using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class Quest
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        [StringLength(6000)]
        public string Description { get; set; }

        [Required]
        public bool Accepted { get; set; }

        [Required]
        public bool Available { get; set; }

        [Required]
        public bool Visible { get; set; }

        [Required]
        public QuestStatus Status { get; set; }

        [Required]
        public Guid CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime AcceptedAt { get; set; }

        public Guid? OriginId { get; set; }

        public Article Origin { get; set; }

        public Quest()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
        }
    }

    public enum QuestStatus
    {
        None, OnHold, InProgress, ToDo
    }
}
