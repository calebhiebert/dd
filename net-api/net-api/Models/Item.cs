﻿using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace net_api.Models
{
    public class Item
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        [Column("Description", TypeName = "TEXT")]
        public string Description { get; set; }

        public string ImageId { get; set; }

        [Required]
        public Guid CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        [Required]
        public bool PlayerVisible { get; set; }

        [Required]
        [Range(-1, int.MaxValue)]
        public int Rarity { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double Cost { get; set; }

        [Required]
        public double Weight { get; set; }

        [Required]
        public string UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        [Column("Tags", TypeName = "varchar[]")]
        public string[] Tags { get; set; }

        public Item()
        {
            Id = Guid.NewGuid();
        }
    }

    public class ItemType
    {
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        public string ImageId { get; set; }
    }

    public class ItemRarity
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [HexColorCodeValidator]
        public string Color { get; set; }
    }
}
