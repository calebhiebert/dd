using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace net_api.Models
{
    [Table("Articles")]
    public class Article
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [StringLength(6000)]
        public string Text { get; set; }

        [Required]
        public Guid CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        [Required]
        public string UserId { get; set; }
        
        public User User { get; set; }

        [Required]
        public bool Published { get; set; }

        public DateTime CreatedAt { get; set; }

        public Guid? MapId { get; set; }
        public Map Map { get; set; }

        public double? Lat { get; set; }
        public double? Lng { get; set; }

        public Article()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
        }
    }

    public class SearchedArticle : Article
    {
        public string FirstImageID { get; set; }

        public string ShortDescription { get; set; }

        public SearchedArticle(Article article)
        {
            this.CampaignId = article.CampaignId;
            this.CreatedAt = article.CreatedAt;
            this.Id = article.Id;
            this.Lat = article.Lat;
            this.Lng = article.Lng;
            this.MapId = article.MapId;
            this.Name = article.Name;
            this.Published = article.Published;
            this.Text = article.Text;
            this.UserId = article.UserId;
        }

        public SearchedArticle(Article article, string imgId) : this(article)
        {
            this.FirstImageID = imgId;
        }
    }
}
