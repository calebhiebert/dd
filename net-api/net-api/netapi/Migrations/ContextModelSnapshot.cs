﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using net_api.Models;

namespace netapi.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
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

            modelBuilder.Entity("net_api.Models.ArticleConcept", b =>
                {
                    b.Property<Guid>("ArticleId");

                    b.Property<Guid>("ConceptId");

                    b.Property<string>("CurrencyCostJson")
                        .HasColumnName("Currency")
                        .HasColumnType("JSONB");

                    b.Property<bool>("IsPurchasable");

                    b.Property<int?>("Quantity");

                    b.Property<bool>("TrackOnEntity");

                    b.HasKey("ArticleId", "ConceptId");

                    b.HasIndex("ConceptId");

                    b.ToTable("ArticleConcepts");
                });

            modelBuilder.Entity("net_api.Models.ArticleQuest", b =>
                {
                    b.Property<Guid>("ArticleId");

                    b.Property<Guid>("QuestId");

                    b.HasKey("ArticleId", "QuestId");

                    b.HasIndex("QuestId");

                    b.ToTable("ArticleQuests");
                });

            modelBuilder.Entity("net_api.Models.AssetView", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("ArticleId");

                    b.Property<Guid>("CampaignId");

                    b.Property<Guid?>("ConceptId");

                    b.Property<DateTime>("DateTime");

                    b.Property<Guid?>("EntityId");

                    b.Property<Guid?>("MapId");

                    b.Property<Guid?>("QuestId");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.HasIndex("CampaignId");

                    b.HasIndex("ConceptId");

                    b.HasIndex("EntityId");

                    b.HasIndex("MapId");

                    b.HasIndex("QuestId");

                    b.HasIndex("UserId");

                    b.ToTable("AssetViews");
                });

            modelBuilder.Entity("net_api.Models.Campaign", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ContentJson")
                        .HasColumnName("Content")
                        .HasColumnType("JSONB");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("CurrencyMapJson")
                        .HasColumnName("CurrencyMap")
                        .HasColumnType("JSONB");

                    b.Property<long[]>("ExperienceTable")
                        .HasColumnName("ExperienceTable")
                        .HasColumnType("bigint[]");

                    b.Property<string>("ImageId")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<Guid?>("OverviewStateId");

                    b.Property<bool>("TrackCoins");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("OverviewStateId")
                        .IsUnique();

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

            modelBuilder.Entity("net_api.Models.Concept", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("ConceptTypeId");

                    b.Property<string>("ContentJson")
                        .HasColumnName("Content")
                        .HasColumnType("JSONB");

                    b.Property<string>("FieldsJson")
                        .HasColumnName("Fields")
                        .HasColumnType("JSONB");

                    b.Property<string>("ImageId");

                    b.Property<bool>("IsContainer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string[]>("Tags")
                        .HasColumnName("Tags")
                        .HasColumnType("varchar[]");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ConceptTypeId");

                    b.HasIndex("UserId");

                    b.ToTable("Concepts");
                });

            modelBuilder.Entity("net_api.Models.ConceptEntity", b =>
                {
                    b.Property<Guid>("ConceptId");

                    b.Property<Guid>("EntityId");

                    b.Property<string>("ContentJson")
                        .HasColumnName("Content")
                        .HasColumnType("JSONB");

                    b.Property<string>("FieldsJson")
                        .HasColumnName("Fields")
                        .HasColumnType("JSONB");

                    b.Property<Guid?>("ParentConceptId");

                    b.Property<Guid?>("ParentEntityId");

                    b.Property<int?>("Quantity");

                    b.Property<int>("SortValue");

                    b.HasKey("ConceptId", "EntityId");

                    b.HasIndex("EntityId");

                    b.HasIndex("ParentConceptId", "ParentEntityId");

                    b.ToTable("ConceptEntities");
                });

            modelBuilder.Entity("net_api.Models.ConceptHistory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ActionSource");

                    b.Property<int>("ActionType");

                    b.Property<Guid>("ConceptId");

                    b.Property<Guid>("ConceptTypeId");

                    b.Property<string>("ContentJson")
                        .HasColumnName("Content")
                        .HasColumnType("JSONB");

                    b.Property<DateTime>("DateTime");

                    b.Property<string>("FieldsJson")
                        .HasColumnName("Fields")
                        .HasColumnType("JSONB");

                    b.Property<string>("ImageId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string[]>("Tags")
                        .HasColumnName("Tags")
                        .HasColumnType("varchar[]");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ConceptId");

                    b.HasIndex("ConceptTypeId");

                    b.HasIndex("UserId");

                    b.ToTable("ConceptHistories");
                });

            modelBuilder.Entity("net_api.Models.ConceptType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CampaignId");

                    b.Property<string>("Description")
                        .HasMaxLength(100);

                    b.Property<string>("EntityConfigJson")
                        .HasColumnName("EntityConfig")
                        .HasColumnType("JSONB");

                    b.Property<string>("FieldJson")
                        .HasColumnName("Fields")
                        .HasColumnType("JSONB");

                    b.Property<string>("Icon");

                    b.Property<bool>("IsLinkableToArticles");

                    b.Property<bool>("IsShownInNavigationMenu");

                    b.Property<bool>("IsUsableInOverviewScreen");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<bool>("PlayerEditable");

                    b.Property<string>("PluralForm")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CampaignId");

                    b.HasIndex("UserId");

                    b.ToTable("ConceptTypes");
                });

            modelBuilder.Entity("net_api.Models.Entity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CampaignId");

                    b.Property<string>("ContentJson")
                        .HasColumnName("Content")
                        .HasColumnType("JSONB");

                    b.Property<string>("CurrencyJson")
                        .HasColumnName("CurrencyAmount")
                        .HasColumnType("JSONB");

                    b.Property<Guid>("EntityPresetId");

                    b.Property<string>("FieldsJson")
                        .HasColumnName("Fields")
                        .HasColumnType("JSONB");

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

                    b.Property<Guid>("CampaignId");

                    b.Property<Guid[]>("ConceptTypesEnabled")
                        .IsRequired()
                        .HasColumnName("ConceptTypesEnabled")
                        .HasColumnType("UUID[]");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("FieldJson")
                        .HasColumnName("Fields")
                        .HasColumnType("JSONB");

                    b.Property<string>("HealthJson")
                        .HasColumnName("Health")
                        .HasColumnType("jsonb");

                    b.Property<string>("ImageId")
                        .IsRequired();

                    b.Property<bool>("IsCurrencyEnabled");

                    b.Property<bool>("IsHealthEnabled");

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

                    b.Property<Guid?>("ArticleId");

                    b.Property<Guid>("CampaignId");

                    b.Property<string>("ContentJson")
                        .HasColumnName("Content")
                        .HasColumnType("JSONB");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<double?>("Lat");

                    b.Property<double?>("Lng");

                    b.Property<Guid?>("MapId");

                    b.Property<string>("MapShapeJson")
                        .HasColumnName("MapShape")
                        .HasColumnType("JSONB");

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

                    b.HasIndex("ArticleId");

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

            modelBuilder.Entity("net_api.Models.OverviewState", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("EntityConceptsJson")
                        .IsRequired()
                        .HasColumnName("EntityConcepts")
                        .HasColumnType("JSONB");

                    b.Property<string>("EntityLabelsJson")
                        .IsRequired()
                        .HasColumnName("EntityLabels")
                        .HasColumnType("JSONB");

                    b.Property<string>("EntitySortOrderJson")
                        .IsRequired()
                        .HasColumnName("EntitySortOrder")
                        .HasColumnType("JSONB");

                    b.HasKey("Id");

                    b.ToTable("OverviewState");
                });

            modelBuilder.Entity("net_api.Models.Purchase", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("ArticleId");

                    b.Property<Guid>("ConceptId");

                    b.Property<string>("CurrencyCostJson")
                        .IsRequired()
                        .HasColumnName("Currency")
                        .HasColumnType("JSONB");

                    b.Property<DateTime>("DateTime");

                    b.Property<Guid>("EntityId");

                    b.Property<int>("Quantity");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.HasIndex("ConceptId");

                    b.HasIndex("EntityId");

                    b.ToTable("PurchaseHistory");
                });

            modelBuilder.Entity("net_api.Models.Quest", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Accepted");

                    b.Property<DateTime?>("AcceptedAt");

                    b.Property<bool>("Available");

                    b.Property<Guid>("CampaignId");

                    b.Property<string>("ContentJson")
                        .HasColumnName("Content")
                        .HasColumnType("JSONB");

                    b.Property<DateTime>("CreatedAt");

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

            modelBuilder.Entity("net_api.Models.QuestNotification", b =>
                {
                    b.HasBaseType("net_api.Models.CampaignNotification");

                    b.Property<Guid>("QuestId");

                    b.HasIndex("QuestId");

                    b.HasDiscriminator().HasValue("QuestNotification");
                });

            modelBuilder.Entity("net_api.Models.SuggestionNotification", b =>
                {
                    b.HasBaseType("net_api.Models.CampaignNotification");

                    b.Property<string>("SuggestedById")
                        .IsRequired();

                    b.Property<string>("SuggestionURL")
                        .IsRequired();

                    b.HasIndex("SuggestedById");

                    b.HasDiscriminator().HasValue("SuggestionNotification");
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

            modelBuilder.Entity("net_api.Models.ArticleConcept", b =>
                {
                    b.HasOne("net_api.Models.Article", "Article")
                        .WithMany("ArticleConcepts")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.Concept", "Concept")
                        .WithMany()
                        .HasForeignKey("ConceptId")
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

            modelBuilder.Entity("net_api.Models.AssetView", b =>
                {
                    b.HasOne("net_api.Models.Article", "Article")
                        .WithMany()
                        .HasForeignKey("ArticleId");

                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany()
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.Concept", "Concept")
                        .WithMany()
                        .HasForeignKey("ConceptId");

                    b.HasOne("net_api.Models.Entity", "Entity")
                        .WithMany()
                        .HasForeignKey("EntityId");

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

            modelBuilder.Entity("net_api.Models.Campaign", b =>
                {
                    b.HasOne("net_api.Models.OverviewState", "OverviewState")
                        .WithOne("Campaign")
                        .HasForeignKey("net_api.Models.Campaign", "OverviewStateId");

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

            modelBuilder.Entity("net_api.Models.Concept", b =>
                {
                    b.HasOne("net_api.Models.ConceptType", "ConceptType")
                        .WithMany()
                        .HasForeignKey("ConceptTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.ConceptEntity", b =>
                {
                    b.HasOne("net_api.Models.Concept", "Concept")
                        .WithMany()
                        .HasForeignKey("ConceptId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.Entity", "Entity")
                        .WithMany("EntityConcepts")
                        .HasForeignKey("EntityId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.ConceptEntity", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentConceptId", "ParentEntityId");
                });

            modelBuilder.Entity("net_api.Models.ConceptHistory", b =>
                {
                    b.HasOne("net_api.Models.Concept", "Concept")
                        .WithMany("History")
                        .HasForeignKey("ConceptId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.ConceptType", "ConceptType")
                        .WithMany()
                        .HasForeignKey("ConceptTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.ConceptType", b =>
                {
                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany("ConceptTypes")
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
                    b.HasOne("net_api.Models.Article", "Article")
                        .WithMany()
                        .HasForeignKey("ArticleId");

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

            modelBuilder.Entity("net_api.Models.Purchase", b =>
                {
                    b.HasOne("net_api.Models.Article", "Article")
                        .WithMany()
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.Concept", "Concept")
                        .WithMany()
                        .HasForeignKey("ConceptId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.Entity", "Entity")
                        .WithMany()
                        .HasForeignKey("EntityId")
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

            modelBuilder.Entity("net_api.Models.QuestNotification", b =>
                {
                    b.HasOne("net_api.Models.Quest", "Quest")
                        .WithMany()
                        .HasForeignKey("QuestId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.SuggestionNotification", b =>
                {
                    b.HasOne("net_api.Models.User", "SuggestedBy")
                        .WithMany()
                        .HasForeignKey("SuggestedById")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
