using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace net_api.Models
{
    public class CampaignUser
    {
        public Guid Id { get; set; }

        [Required]
        public Guid CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        public string UserId { get; set; }
        public virtual User User { get; set; }

        public CampaignUser()
        {
            Id = Guid.NewGuid();
        }
    }
}

