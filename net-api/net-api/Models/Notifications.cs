using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace net_api.Models
{
    public class Notification
    {
        [Required]
        public Guid Id { get; set; }

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
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
        }

        public Notification(string userId, string message)
        {
            UserId = userId;
            Message = message;
        }
    }

    public class CampaignNotification : Notification
    {
        [Required]
        public Guid CampaignId { get; set; }
        public Campaign Campaign { get; set; }

        public CampaignNotification() : base() { }

        public CampaignNotification(string userId, string message, Guid campaignId) : base(userId, message)
        {
            CampaignId = campaignId;
        }
    }

    public class MapNotification : CampaignNotification
    {
        [Required]
        public Guid MapId { get; set; }
        public Map Map { get; set; }
    }

    public class QuestNotification : CampaignNotification
    {
        [Required]
        public Guid QuestId { get; set; }
        public Quest Quest { get; set; }

        public QuestNotification() : base() { }

        public QuestNotification(string userId, string message, Guid campaignId, Guid questId) : base(userId, message, campaignId)
        {
            QuestId = questId;
        } 
    }
}
