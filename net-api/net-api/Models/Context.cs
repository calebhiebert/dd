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
        public DbSet<InventoryItem> InventoryItems { get; set; }
        public DbSet<Quest> Quests { get; set; }
        public DbSet<Note> Notes { get; set; }

        public DbSet<Notification> Notifications { get; set; }
        public DbSet<CampaignNotification> CampaignInviteNotifications { get; set; }

        public DbSet<ThingOfInterest> ThingsOfInterest { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<SellableItem> SellableItems { get; set; }
        public DbSet<Spell> Spells { get; set; }
        public DbSet<EntitySpell> EntitySpells { get; set; }

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

            optionsBuilder.UseNpgsql(connectionString, opt => opt.EnableRetryOnFailure(10));
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CampaignUser>().HasKey(tbl => new { tbl.CampaignId, tbl.UserId });
            modelBuilder.Entity<InventoryItem>().HasKey(tbl => new { tbl.EntityId, tbl.ItemId });
            modelBuilder.Entity<EntitySpell>().HasKey(tbl => new { tbl.EntityId, tbl.SpellId });
        }
    }
}
