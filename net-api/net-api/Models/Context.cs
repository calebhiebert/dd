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
        
        public DateTime CreatedAt { get; set; }
    }

    public class EntityPreset
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public string ImageId { get; set; }
        public bool PlayerCreatable { get; set; }
        public string CampaignId { get; set; }
    }
}
