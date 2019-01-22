using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace net_api.Models
{
    public class Notification
    {
        [Required]
        public string Id { get; set; }

        [Required]
        [StringLength(240)]
        public string Message { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public Notification()
        {
            Id = Nanoid.Nanoid.Generate();
            CreatedAt = DateTime.UtcNow;
        }
    }

    public class CampaignNotification : Notification
    {
        [Required]
        public string CampaignId { get; set; }
        public Campaign Campaign { get; set; }
    }
}
