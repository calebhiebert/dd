using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class EntitySpell
    {
        [Required]
        [Key]
        public Guid SpellId { get; set; }

        public Spell Spell { get; set; }

        [Required]
        [Key]
        public Guid EntityId { get; set; }
        
        [JsonIgnore]
        public Entity Entity { get; set; }
    }
}
