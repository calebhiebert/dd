﻿using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
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
        public DbSet<Quest> Quests { get; set; }
        public DbSet<Map> Maps { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<AssetView> AssetViews { get; set; }


        public DbSet<Article> Articles { get; set; }
        public DbSet<ArticleQuest> ArticleQuests { get; set; }
        public DbSet<ArticleConcept> ArticleConcepts { get; set; }

        public DbSet<ConceptType> ConceptTypes { get; set; }
        public DbSet<Concept> Concepts { get; set; }
        public DbSet<ConceptEntity> ConceptEntities { get; set; }
        public DbSet<ConceptHistory> ConceptHistories { get; set; }

        public DbSet<Notification> Notifications { get; set; }
        public DbSet<CampaignNotification> CampaignInviteNotifications { get; set; }
        public DbSet<MapNotification> MapNotifications { get; set; }
        public DbSet<QuestNotification> QuestNotifications { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Host=localhost;Port=5432;Database=dd;Password=dd;User ID=dd";

            var dbCreds = Environment.GetEnvironmentVariable("DATABASE_URL");

            if (dbCreds != null)
            {
                var reg = new Regex("postgres://(?<Username>[a-z]+):(?<Password>[a-zA-Z0-9]+)@(?<Host>[a-z0-9-.]+):(?<Port>[0-9]+)/(?<Database>[a-z0-9]+)");
                var matches = reg.Match(dbCreds.Trim());
                connectionString = $"Host={matches.Groups["Host"]};Port={matches.Groups["Port"]};Database={matches.Groups["Database"]};Password={matches.Groups["Password"]};User ID={matches.Groups["Username"]}";
                connectionString += ";SSL Mode=Prefer;Trust Server Certificate=true";
            }

            optionsBuilder.UseNpgsql(connectionString, opt => opt
                .EnableRetryOnFailure(10)
                .CommandTimeout((int)TimeSpan.FromMinutes(10).TotalSeconds));

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CampaignUser>().HasKey(tbl => new { tbl.CampaignId, tbl.UserId });
            modelBuilder.Entity<ArticleQuest>().HasKey(tbl => new { tbl.ArticleId, tbl.QuestId });
            modelBuilder.Entity<ArticleConcept>().HasKey(tbl => new { tbl.ArticleId, tbl.ConceptId });
            modelBuilder.Entity<ConceptEntity>().HasKey(tbl => new { tbl.ConceptId, tbl.EntityId });
            modelBuilder.Entity<AssetView>()
                .Property(av => av.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Query<ArticlePopularity>();
            modelBuilder.Query<MapBytePosition>();
            modelBuilder.Query<Tags>();
        }
    }
}
