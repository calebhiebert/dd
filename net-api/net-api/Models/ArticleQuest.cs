using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class ArticleQuest
    {
        [Required]
        public Guid ArticleId { get; set; }

        [JsonIgnore]
        public Article Article { get; set; }

        [Required]
        public Guid QuestId { get; set; }

        public Quest Quest { get; set; }
    }
}
