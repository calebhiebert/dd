using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class Concept
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(30)]
        public string Name { get; set; }

        [JsonIgnore]
        [Column("Content", TypeName = "JSONB")]
        public string ContentJson { get; set; }

        [NotMapped]
        public Object Content
        {
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
        public string UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        public string ImageId { get; set; }

        [Column("Fields", TypeName = "JSONB")]
        [JsonIgnore]
        public string FieldsJson { get; set; }

        [NotMapped]
        [Required]
        public List<Field> Fields
        {
            get
            {
                if (FieldsJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<List<Field>>(FieldsJson);
            }

            set
            {
                FieldsJson = JsonConvert.SerializeObject(value);
            }
        }

        [Column("Tags", TypeName = "varchar[]")]
        public string[] Tags { get; set; }

        [Required]
        public bool IsContainer { get; set; }

        [Required]
        public Guid ConceptTypeId { get; set; }

        public ConceptType ConceptType { get; set; }

        public List<ConceptHistory> History { get; set; }

        public Concept()
        {
            Id = Guid.NewGuid();
        }
    }

    public class ConceptHistory
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        [Required]
        public ActionType ActionType { get; set; }

        [Required]
        public ActionSource ActionSource { get; set; }

        [Required]
        public Guid ConceptId { get; set; }

        [JsonIgnore]
        public Concept Concept { get; set; }

        [Required]
        [StringLength(30)]
        public string Name { get; set; }

        [JsonIgnore]
        [Column("Content", TypeName = "JSONB")]
        public string ContentJson { get; set; }

        [NotMapped]
        public Object Content
        {
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

        public string ImageId { get; set; }

        [Column("Fields", TypeName = "JSONB")]
        [JsonIgnore]
        public string FieldsJson { get; set; }

        [NotMapped]
        [Required]
        public List<Field> Fields
        {
            get
            {
                if (FieldsJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<List<Field>>(FieldsJson);
            }

            set
            {
                FieldsJson = JsonConvert.SerializeObject(value);
            }
        }

        [Column("Tags", TypeName = "varchar[]")]
        public string[] Tags { get; set; }

        [Required]
        public Guid ConceptTypeId { get; set; }

        [JsonIgnore]
        public ConceptType ConceptType { get; set; }

        public ConceptHistory()
        {
            Id = Guid.NewGuid();
            DateTime = DateTime.UtcNow;
        }

        public ConceptHistory(Concept concept) : this()
        {
            ConceptId = concept.Id;
            Name = concept.Name;
            ContentJson = concept.ContentJson;
            ImageId = concept.ImageId;
            FieldsJson = concept.FieldsJson;
            Tags = concept.Tags;
            ConceptTypeId = concept.ConceptTypeId;
        }
    }

    public class Field
    {
        [Required]
        [StringLength(30)]
        public string Name { get; set; }

        public Object Value { get; set; }
    }
}
