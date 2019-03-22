using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    /// <summary>
    /// A table for storing when users view different objects
    /// </summary>
    public class AssetView
    {
        public long Id { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        public Guid? ArticleId { get; set; }
        public Article Article { get; set; }

        public Guid? QuestId { get; set; }
        public Quest Quest { get; set; }

        public Guid? ConceptId { get; set; }
        public Concept Concept { get; set; }

        public Guid? EntityId { get; set; }
        public Entity Entity { get; set; }

        public Guid? MapId { get; set; }
        public Map Map { get; set; }

        public Guid CampaignId { get; set; }
        public Campaign Campaign { get; set; }

        public AssetView()
        {
            DateTime = DateTime.UtcNow;
        }

        public AssetView(string userId, Guid campaignId) : this()
        {
            UserId = userId;
            CampaignId = campaignId;
        }
    }
    
    public class ArticlePopularity
    {
        public Guid ArticleId { get; set; }
        public Article Article { get; set; }
        public int Views { get; set; }
    }
}
