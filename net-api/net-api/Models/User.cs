using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace net_api.Models
{
    public class User
    {
        [Required]
        public string Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Username { get; set; }

        [Required]
        public string PictureURL { get; set; }
        public DateTime CreatedAt { get; set; }

        [JsonIgnore]
        public ICollection<Campaign> Campaigns { get; set; }

        [JsonIgnore]
        public ICollection<Entity> Entities { get; set; }

        [JsonIgnore]
        public ICollection<Notification> Notifications { get; set; }

        public User()
        {
            CreatedAt = DateTime.UtcNow;
        }
    }
}
