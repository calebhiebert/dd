using System;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace net_api.Models
{
    public class CampaignInvite
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public CampaignInviteStatus Status { get; set; }

        [Required]
        public string CampaignId { get; set; }

        public Campaign Campaign { get; set; }

        [ForeignKey("User")]
        public string AcceptedUserId { get; set; }
        public User User { get; set; }

        public CampaignInvite()
        {
            Id = Nanoid.Nanoid.Generate(size: 64);
            CreatedAt = new DateTime();
            Status = CampaignInviteStatus.Pending;
        }
    }

    public enum CampaignInviteStatus
    {
        Pending, Revoked, Accepted, Declined
    }
}

