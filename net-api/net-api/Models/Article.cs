using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

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
        public List<ArticleConcept> ArticleConcepts { get; set; }

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

    public class SearchedArticle
    {
        public List<string> ImageURLs { get; set; }

        public Guid Id { get; set; }
        public Guid? MapId { get; set; }
        public string Name { get; set; }
        public bool Published { get; set; }
        public string UserId { get; set; }
        public string[] Tags { get; set; }
        public string Icon { get; set; }
        public int QuestCount { get; set; }
        public Guid[] ConceptTypeIds { get; set; }
        public bool HasQuests { get; set; }

        public SearchedArticle(Article article)
        {
            this.Id = article.Id;
            this.MapId = article.MapId;
            this.Name = article.Name;
            this.Published = article.Published;
            this.UserId = article.UserId;
            this.Tags = article.Tags;
            this.Icon = article.Icon;

            HasQuests = article.ArticleQuests != null && article.ArticleQuests.Count > 0;
            
            if (article.ArticleConcepts != null && article.ArticleConcepts.Count > 0)
            {
                ConceptTypeIds = article.ArticleConcepts
                    .Where(ac => ac.Concept != null)
                    .GroupBy(ac => ac.Concept.ConceptTypeId)
                    .Select(ac => ac.Key)
                    .ToArray();
            } else
            {
                ConceptTypeIds = new Guid[0];
            }
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
