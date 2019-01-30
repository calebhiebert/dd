using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace net_api.Models
{
    public class CampaignUser
    {
        [Required]
        [Key]
        public Guid CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        [Key]
        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}

