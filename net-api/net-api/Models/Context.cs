using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<EntityPreset> EntityPresets { get; set; }
        public DbSet<EntityAttribute> EntityAttributes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=dd;Password=dd;User ID=dd");
            base.OnConfiguring(optionsBuilder);
        }
    }

    public class User
    {
        [Required]
        public string Id { get; set; }
        
        [Required]
        [StringLength(30, MinimumLength =3)]
        public string Username { get; set; }

        [Required]
        public string PictureURL { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual ICollection<Campaign> Campaigns { get; set; }
    }

    public class Campaign
    {
        public string Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength =3)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ImageId { get; set; }

        [Required]
        public string UserId { get; set; }
        public virtual User User { get; set; }
        
        [Column("ExperienceTable", TypeName ="bigint[]")]
        public long[] ExperienceTable { get; set; }

        public virtual ICollection<EntityPreset> EntityPresets { get; set; }
        
        public DateTime CreatedAt { get; set; }
    }

    public class EntityPreset
    {
        public string Id { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        [Required]
        public string ImageId { get; set; }
        
        [Required]
        public bool PlayerCreatable { get; set; }

        public virtual ICollection<EntityAttribute> Attributes { get; set; }

        [Required]
        public string CampaignId { get; set; }
        public virtual Campaign Campaign { get; set; }
    }

    public class EntityAttribute
    {
        public string Id { get; set; }
        
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Name { get; set; }

        [StringLength(150, MinimumLength = 3)]
        public string Description { get; set; }

        public string ImageId { get; set; }

        public string DefaultValue { get; set; }

        [Required]
        public AttributeType Type { get; set; }

        [Column("Options", TypeName = "varchar[]")]
        public string[] Options { get; set; }

        [Required]
        public AttributeClass Class { get; set; }

        [Required]
        public bool Required { get; set; }

        [Required]
        public string EntityPresetId { get; set; }
        public virtual EntityPreset Preset { get; set; }

        public double Max { get; set; }
        public double Min { get; set; }
    }

    public enum AttributeType
    {
        String, Number, Enum
    }

    public enum AttributeClass
    {
        Major, Normal, Minor, Unimportant
    }
}
