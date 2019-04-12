using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace net_api.Models
{
    public class Purchase
    {
        public Guid Id { get; set; }
        public Guid ConceptId { get; set; }
        public Concept Concept { get; set; }
        public Guid ArticleId { get; set; }
        public Article Article { get; set; }
        public Guid EntityId { get; set; }
        public Entity Entity { get; set; }
        public int Quantity { get; set; }

        [Required]
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
        public DateTime DateTime { get; set; }

        [NotMapped]
        public CurrencyStore TotalCurrencyCost
        {
            get
            {
                return CurrencyStore.Multiply(CurrencyCost, Quantity);
            }
        }

        public Purchase()
        {
            Id = Guid.NewGuid();
            DateTime = DateTime.UtcNow;
        }
    }
}
