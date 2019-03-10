using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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

        [JsonIgnore]
        [Column("Content", TypeName = "JSONB")]
        public string ContentJson { get; set; }

        [NotMapped]
        public Object Content {
            get
            {
                if (ContentJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject(ContentJson);
            }

            set
            {
                ContentJson = JsonConvert.SerializeObject(value);
            }
        }

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

        [Column("Tags", TypeName = "varchar[]")]
        public string[] Tags { get; set; }

        public string Icon { get; set; }

        public List<ArticleQuest> ArticleQuests { get; set; }

        public Article()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
        }

        public List<string> GetImageURLS()
        {
            var imageURLs = new List<string>();

            if (ContentJson != null && ContentJson != "null")
            {
                var jobject = JObject.Parse(ContentJson);

                var ops = jobject["ops"];

                if (ops != null && ops.Type == JTokenType.Array)
                {
                    foreach (var op in ops)
                    {
                        if (op["insert"] != null && op["insert"].Type == JTokenType.Object)
                        {
                            if (op["insert"]["image"] != null)
                            {
                                imageURLs.Add(op["insert"]["image"].ToString());
                            }
                        }
                    }
                }
            }

            return imageURLs;
        }
    }

    public class SearchedArticle : Article
    {
        public List<string> ImageURLs { get; set; }

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
            this.UserId = article.UserId;
            this.Tags = article.Tags;
            this.ArticleQuests = article.ArticleQuests;
            this.Icon = article.Icon;
        }

        public SearchedArticle(Article article, string imgId) : this(article)
        {
            try
            {
                ImageURLs = article.GetImageURLS();
            } catch (JsonReaderException)
            {
                // There was some invalid json in the content, technically this is okay
                // Eventually there will be some input validation on the content field
                ImageURLs = new List<string>();
            }
        }
    }
}
