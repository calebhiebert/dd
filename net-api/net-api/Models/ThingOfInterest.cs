using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace net_api.Models
{
    public class ThingOfInterest
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [StringLength(3000)]
        public string Description { get; set; }

        [ForeignKey("Location")]
        public Guid? LocationId { get; set; }
        public Location Location { get; set; }

        [Column("ImageIds", TypeName = "varchar[]")]
        public string[] ImageIds { get; set; }

        public ICollection<SellableItem> SellableItems { get; set; }

        public DateTime CreatedAt { get; set; }

        [NotMapped]
        public string TOIType
        {
            get
            {
                return GetType().Name;
            }
        }

        public ThingOfInterest()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
        }
    }

    public class Location : ThingOfInterest
    {
        [Required]
        public LocationType Type { get; set; }
    }

    public enum LocationType
    {
        Region, Country, City, Town, Village, Farm, Shop, House, Market, Wonder
    }
}
