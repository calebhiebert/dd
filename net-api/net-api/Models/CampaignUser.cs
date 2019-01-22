using Newtonsoft.Json;

namespace net_api.Models
{
    public class CampaignUser
    {
        public CampaignUser()
        {
            Id = Nanoid.Nanoid.Generate();
        }

        public string Id { get; set; }

        public string CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}

