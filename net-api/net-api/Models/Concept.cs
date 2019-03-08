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

        public ConceptType ConceptType { get; set; }

        public Concept()
        {
            Id = Guid.NewGuid();
        }
    }

    public class Field
    {
        [Required]
        [StringLength(30)]
        public string Name { get; set; }

        [Required]
        public Object Value { get; set; }
    }
}
