﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using net_api.Models;

namespace netapi.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20190225191235_ArticleQuests")]
    partial class ArticleQuests
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.1-servicing-10028")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("net_api.Models.Article", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CampaignId");

                    b.Property<string>("ContentJson")
                        .HasColumnName("Content")
                        .HasColumnType("JSONB");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Icon");

                    b.Property<double?>("Lat");

                    b.Property<double?>("Lng");

                    b.Property<Guid?>("MapId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<bool>("Published");

                    b.Property<string[]>("Tags")
                        .HasColumnName("Tags")
                        .HasColumnType("varchar[]");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CampaignId");

                    b.HasIndex("MapId");

                    b.HasIndex("UserId");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("net_api.Models.ArticleQuest", b =>
                {
                    b.Property<Guid>("ArticleId");

                    b.Property<Guid>("QuestId");

                    b.HasKey("ArticleId", "QuestId");

                    b.HasIndex("QuestId");

                    b.ToTable("ArticleQuests");
                });

            modelBuilder.Entity("net_api.Models.Campaign", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<long[]>("ExperienceTable")
                        .HasColumnName("ExperienceTable")
                        .HasColumnType("bigint[]");

                    b.Property<string>("ImageId")
                        .IsRequired();

                    b.Property<string>("ItemRarityTableJson")
                        .HasColumnName("ItemRarityTable")
                        .HasColumnType("jsonb");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<bool>("PlayersCanEditItems");

                    b.Property<bool>("PlayersCanEditSpells");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Campaigns");
                });

            modelBuilder.Entity("net_api.Models.CampaignInvite", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AcceptedUserId");

                    b.Property<Guid>("CampaignId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.HasIndex("AcceptedUserId");

                    b.HasIndex("CampaignId");

                    b.ToTable("CampaignInvites");
                });

            modelBuilder.Entity("net_api.Models.CampaignUser", b =>
                {
                    b.Property<Guid>("CampaignId");

                    b.Property<string>("UserId");

                    b.HasKey("CampaignId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("CampaignUsers");
                });

            modelBuilder.Entity("net_api.Models.Entity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AttributesJson")
                        .HasColumnName("Attributes")
                        .HasColumnType("jsonb");

                    b.Property<Guid>("CampaignId");

                    b.Property<double?>("Currency");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<Guid>("EntityPresetId");

                    b.Property<string>("HealthJson")
                        .HasColumnName("Health")
                        .HasColumnType("jsonb");

                    b.Property<string>("ImageColor1");

                    b.Property<string>("ImageColor2");

                    b.Property<string>("ImageId");

                    b.Property<double?>("Lat");

                    b.Property<double?>("Lng");

                    b.Property<Guid?>("MapId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<bool>("Spawnable");

                    b.Property<Guid?>("SpawnedFromId");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.Property<long?>("XP");

                    b.HasKey("Id");

                    b.HasIndex("CampaignId");

                    b.HasIndex("EntityPresetId");

                    b.HasIndex("MapId");

                    b.HasIndex("SpawnedFromId");

                    b.HasIndex("UserId");

                    b.ToTable("Entities");
                });

            modelBuilder.Entity("net_api.Models.EntityPreset", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AttributeJson")
                        .HasColumnName("Attributes")
                        .HasColumnType("jsonb");

                    b.Property<Guid>("CampaignId");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("HealthJson")
                        .HasColumnName("Health")
                        .HasColumnType("jsonb");

                    b.Property<string>("ImageId")
                        .IsRequired();

                    b.Property<bool>("IsCurrencyEnabled");

                    b.Property<bool>("IsHealthEnabled");

                    b.Property<bool>("IsInventoryEnabled");

                    b.Property<bool>("IsSpellsetsEnabled");

                    b.Property<bool>("IsXPEnabled");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<bool>("PlayerCreatable");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CampaignId");

                    b.HasIndex("UserId");

                    b.ToTable("EntityPresets");
                });

            modelBuilder.Entity("net_api.Models.EntitySpell", b =>
                {
                    b.Property<Guid>("EntityId");

                    b.Property<Guid>("SpellId");

                    b.HasKey("EntityId", "SpellId");

                    b.HasIndex("SpellId");

                    b.ToTable("EntitySpells");
                });

            modelBuilder.Entity("net_api.Models.InventoryItem", b =>
                {
                    b.Property<Guid>("EntityId");

                    b.Property<Guid>("ItemId");

                    b.Property<int>("Quantity");

                    b.HasKey("EntityId", "ItemId");

                    b.HasIndex("ItemId");

                    b.ToTable("InventoryItems");
                });

            modelBuilder.Entity("net_api.Models.Item", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CampaignId");

                    b.Property<double>("Cost");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnName("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<bool>("PlayerVisible");

                    b.Property<int>("Rarity");

                    b.Property<string[]>("Tags")
                        .HasColumnName("Tags")
                        .HasColumnType("varchar[]");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.Property<double>("Weight");

                    b.HasKey("Id");

                    b.HasIndex("CampaignId");

                    b.HasIndex("UserId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("net_api.Models.Map", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CampaignId");

                    b.Property<string>("MappingJson")
                        .HasColumnName("Mapping")
                        .HasColumnType("jsonb");

                    b.Property<int?>("MaxZoom");

                    b.Property<int?>("MinZoom");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<bool>("PlayerVisible");

                    b.Property<string>("ShapesJson")
                        .HasColumnName("Shapes")
                        .HasColumnType("jsonb");

                    b.Property<int>("Status");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CampaignId");

                    b.HasIndex("UserId");

                    b.ToTable("Maps");
                });

            modelBuilder.Entity("net_api.Models.Note", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CampaignId");

                    b.Property<string>("ContentJson")
                        .HasColumnName("Content")
                        .HasColumnType("JSONB");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<double?>("Lat");

                    b.Property<double?>("Lng");

                    b.Property<Guid?>("MapId");

                    b.Property<bool>("PublicEdit");

                    b.Property<bool>("PublicView");

                    b.Property<Guid?>("QuestId");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CampaignId");

                    b.HasIndex("MapId");

                    b.HasIndex("QuestId");

                    b.HasIndex("UserId");

                    b.ToTable("Notes");
                });

            modelBuilder.Entity("net_api.Models.Notification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasMaxLength(240);

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Notifications");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Notification");
                });

            modelBuilder.Entity("net_api.Models.Quest", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Accepted");

                    b.Property<DateTime>("AcceptedAt");

                    b.Property<bool>("Available");

                    b.Property<Guid>("CampaignId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(6000);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<Guid?>("OriginId");

                    b.Property<int>("Status");

                    b.Property<bool>("Visible");

                    b.HasKey("Id");

                    b.HasIndex("CampaignId");

                    b.HasIndex("OriginId");

                    b.ToTable("Quests");
                });

            modelBuilder.Entity("net_api.Models.Spell", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CampaignId");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnName("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<bool>("PlayerVisible");

                    b.Property<string[]>("Tags")
                        .HasColumnName("Tags")
                        .HasColumnType("varchar[]");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CampaignId");

                    b.HasIndex("UserId");

                    b.ToTable("Spells");
                });

            modelBuilder.Entity("net_api.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("PictureURL")
                        .IsRequired();

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("net_api.Models.CampaignNotification", b =>
                {
                    b.HasBaseType("net_api.Models.Notification");

                    b.Property<Guid>("CampaignId");

                    b.HasIndex("CampaignId");

                    b.HasDiscriminator().HasValue("CampaignNotification");
                });

            modelBuilder.Entity("net_api.Models.MapNotification", b =>
                {
                    b.HasBaseType("net_api.Models.CampaignNotification");

                    b.Property<Guid>("MapId");

                    b.HasIndex("MapId");

                    b.HasDiscriminator().HasValue("MapNotification");
                });

            modelBuilder.Entity("net_api.Models.Article", b =>
                {
                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany()
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.Map", "Map")
                        .WithMany()
                        .HasForeignKey("MapId");

                    b.HasOne("net_api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.ArticleQuest", b =>
                {
                    b.HasOne("net_api.Models.Article", "Article")
                        .WithMany("ArticleQuests")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.Quest", "Quest")
                        .WithMany()
                        .HasForeignKey("QuestId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.Campaign", b =>
                {
                    b.HasOne("net_api.Models.User", "User")
                        .WithMany("Campaigns")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.CampaignInvite", b =>
                {
                    b.HasOne("net_api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("AcceptedUserId");

                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany("Invites")
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.CampaignUser", b =>
                {
                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany("Members")
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.Entity", b =>
                {
                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany("Entities")
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.EntityPreset", "Preset")
                        .WithMany()
                        .HasForeignKey("EntityPresetId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.Map", "Map")
                        .WithMany()
                        .HasForeignKey("MapId");

                    b.HasOne("net_api.Models.Entity", "SpawnedFrom")
                        .WithMany()
                        .HasForeignKey("SpawnedFromId");

                    b.HasOne("net_api.Models.User", "User")
                        .WithMany("Entities")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.EntityPreset", b =>
                {
                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany("EntityPresets")
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.EntitySpell", b =>
                {
                    b.HasOne("net_api.Models.Entity", "Entity")
                        .WithMany("EntitySpells")
                        .HasForeignKey("EntityId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.Spell", "Spell")
                        .WithMany()
                        .HasForeignKey("SpellId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.InventoryItem", b =>
                {
                    b.HasOne("net_api.Models.Entity", "Entity")
                        .WithMany("InventoryItems")
                        .HasForeignKey("EntityId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.Item", "Item")
                        .WithMany()
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.Item", b =>
                {
                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany("Items")
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.Map", b =>
                {
                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany()
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.Note", b =>
                {
                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany()
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.Map", "Map")
                        .WithMany()
                        .HasForeignKey("MapId");

                    b.HasOne("net_api.Models.Quest", "Quest")
                        .WithMany()
                        .HasForeignKey("QuestId");

                    b.HasOne("net_api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.Notification", b =>
                {
                    b.HasOne("net_api.Models.User", "User")
                        .WithMany("Notifications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.Quest", b =>
                {
                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany("Quests")
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.Article", "Origin")
                        .WithMany()
                        .HasForeignKey("OriginId");
                });

            modelBuilder.Entity("net_api.Models.Spell", b =>
                {
                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany()
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("net_api.Models.CampaignNotification", b =>
                {
                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany()
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.MapNotification", b =>
                {
                    b.HasOne("net_api.Models.Map", "Map")
                        .WithMany()
                        .HasForeignKey("MapId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
