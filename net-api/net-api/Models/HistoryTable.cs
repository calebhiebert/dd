using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class HistoryTable
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
    }

    public enum ActionType
    {
        Create, Update, Delete, Restore
    }

    public enum ActionSource
    {
        User, Import
    }
}
