using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class ArticleConcept
    {
        [Required]
        public Guid ArticleId { get; set; }

        public Article Article { get; set; }

        [Required]
        public Guid ConceptId { get; set; }

        public Concept Concept { get; set; }

        [Required]
        public bool IsPurchasable { get; set; }

        [JsonIgnore]
        [Column("Currency", TypeName = "JSONB")]
        public string CurrencyCostJson { get; set; }

        [NotMapped]
        public CurrencyStore CurrencyCost
        {
            get
            {
                if (CurrencyCostJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<CurrencyStore>(CurrencyCostJson);
            }

            set
            {
                CurrencyCostJson = JsonConvert.SerializeObject(value);
            }
        }

        public int? Quantity { get; set; }

        // If true, when purchased this concept will be tracked on the entity
        // If false, currency will be deducted, but that's it
        [Required]
        public bool TrackOnEntity { get; set; }
    }
}
