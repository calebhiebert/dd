using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace net_api.Models
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<EntityPreset> EntityPresets { get; set; }
        public DbSet<Entity> Entities { get; set; }
        public DbSet<CampaignUser> CampaignUsers { get; set; }
        public DbSet<CampaignInvite> CampaignInvites { get; set; }
        public DbSet<Item> Items { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Host=localhost;Port=5432;Database=dd;Password=dd;User ID=dd";

            var dbCreds = Environment.GetEnvironmentVariable("DATABASE_URL");

            if (dbCreds != null)
            {
                var reg = new Regex("postgres://(?<Username>[a-z]+):(?<Password>[a-z0-9]+)@(?<Host>[a-z0-9-.]+):(?<Port>[0-9]+)/(?<Database>[a-z0-9]+)");
                var matches = reg.Match(dbCreds.Trim());
                connectionString = $"Host={matches.Groups["Host"]};Port={matches.Groups["Port"]};Database={matches.Groups["Database"]};Password={matches.Groups["Password"]};User ID={matches.Groups["Username"]}";
            }

            optionsBuilder.UseNpgsql(connectionString);
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

        [JsonIgnore]
        public ICollection<Campaign> Campaigns { get; set; }

        [JsonIgnore]
        public ICollection<Entity> Entities { get; set; }
    }

    public class Campaign
    {
        public Campaign()
        {
            Members = new List<CampaignUser>();
        }

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

        public ICollection<CampaignUser> Members { get; set; }
        
        [XPTable]
        [Column("ExperienceTable", TypeName ="bigint[]")]
        public long[] ExperienceTable { get; set; }

        public ICollection<EntityPreset> EntityPresets { get; set; }

        public ICollection<Entity> Entities { get; set; }

        public ICollection<Item> Items { get; set; }

        [Column("CurrencyTypes", TypeName = "jsonb")]
        [JsonIgnore]
        public string CurrencyTypesJson { get; set; }

        [NotMapped]
        public List<CurrencyType> CurrencyTypes
        {
            get
            {
                if (CurrencyTypesJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<List<CurrencyType>>(CurrencyTypesJson);
            } 

            set
            {
                CurrencyTypesJson = JsonConvert.SerializeObject(value);
            }
        }

        [Column("ItemRarityTable", TypeName = "jsonb")]
        [JsonIgnore]
        public string ItemRarityTableJson { get; set; }

        [NotMapped]
        public List<ItemRarity> ItemRarities
        {
            get
            {
                if (ItemRarityTableJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<List<ItemRarity>>(ItemRarityTableJson);
            }

            set
            {
                ItemRarityTableJson = JsonConvert.SerializeObject(value);
            }
        }

        public DateTime CreatedAt { get; set; }
    }

    public class CampaignUser
    {
        public CampaignUser()
        {
            Id = Nanoid.Nanoid.Generate();
        }

        public string Id { get; set; }

        public string CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        public string UserId { get; set; }
        public virtual User User { get; set; }
    }

    public class Entity
    {
        public string Id { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string UserId { get; set; }

        public User User { get; set; }

        [Required]
        public string CampaignId { get; set; }


        public string ImageId { get; set; }

        [Column("Attributes", TypeName = "jsonb")]
        [JsonIgnore]
        public string AttributesJson { get; set; }

        [NotMapped]
        public List<Attribute> Attributes
        {
            get
            {
                if (AttributesJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<List<Attribute>>(AttributesJson);
            }

            set
            {
                AttributesJson = JsonConvert.SerializeObject(value);
            }
        }

        [Required]
        [Range(0, long.MaxValue)]
        public long XP { get; set; }

        [Required]
        public string EntityPresetId { get; set; }
        public EntityPreset Preset { get; set; }
    }

    public class CampaignInvite
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public CampaignInviteStatus Status { get; set; }

        [Required]
        public string CampaignId { get; set; }

        public Campaign Campaign { get; set; }

        [ForeignKey("User")]
        public string AcceptedUserId { get; set; }
        public User User { get; set; }

        public CampaignInvite()
        {
            Id = Nanoid.Nanoid.Generate(size: 64);
            CreatedAt = new DateTime();
            Status = CampaignInviteStatus.Pending;
        }
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

        [Column("Attributes", TypeName = "jsonb")]
        [JsonIgnore]
        public string AttributeJson { get; set; }

        [NotMapped]
        [Required]
        public List<EntityAttribute> Attributes {
            get
            {
                if (AttributeJson == null)
                {
                    return null;
                }

                return JsonConvert.DeserializeObject<List<EntityAttribute>>(AttributeJson);
            }

            set
            {
                AttributeJson = JsonConvert.SerializeObject(value);
            }
        }

        [Required]
        public string CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }
    }

    public class Item
    {
        public string Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        [StringLength(3000, MinimumLength = 3)]
        public string Description { get; set; }

        public string ImageId { get; set; }

        [Required]
        public string CampaignId { get; set; }

        [JsonIgnore]
        public Campaign Campaign { get; set; }

        [Required]
        [Range(-1, double.MaxValue)]
        public int Rarity { get; set; }

        [Column("Tags", TypeName = "varchar[]")]
        public string[] Tags { get; set; }
    }

    public class EntityAttribute
    {    
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

        public double? Max { get; set; }

        public double? Min { get; set; }
    }

    public class Attribute
    {
        public string Name { get; set; }
        public AttributeType Type { get; set; }
        public string Data { get; set; }
    }

    public class ItemType
    {
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        public string ImageId { get; set; }
    }

    public class CurrencyType
    {
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        public string ImageId { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double Value { get; set; }
    }

    public class ItemRarity
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Color { get; set; }
    }

    public enum AttributeType
    {
        String, Number, Enum, Currency
    }

    public enum AttributeClass
    {
        Major, Normal, Minor, Unimportant
    }

    public enum CampaignInviteStatus
    {
        Pending, Revoked, Accepted, Declined
    }
}
