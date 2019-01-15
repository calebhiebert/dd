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
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("net_api.Models.Campaign", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("CurrencyTypesJson")
                        .HasColumnName("CurrencyTypes")
                        .HasColumnType("jsonb");

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

                    b.Property<string>("CampaignId")
                        .IsRequired();

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
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CampaignId");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CampaignId");

                    b.HasIndex("UserId");

                    b.ToTable("CampaignUsers");
                });

            modelBuilder.Entity("net_api.Models.Entity", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AttributesJson")
                        .HasColumnName("Attributes")
                        .HasColumnType("jsonb");

                    b.Property<string>("CampaignId")
                        .IsRequired();

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("EntityPresetId")
                        .IsRequired();

                    b.Property<string>("ImageId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.Property<long>("XP");

                    b.HasKey("Id");

                    b.HasIndex("CampaignId");

                    b.HasIndex("EntityPresetId");

                    b.HasIndex("UserId");

                    b.ToTable("Entities");
                });

            modelBuilder.Entity("net_api.Models.EntityPreset", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AttributeJson")
                        .HasColumnName("Attributes")
                        .HasColumnType("jsonb");

                    b.Property<string>("CampaignId")
                        .IsRequired();

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("ImageId")
                        .IsRequired();

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

            modelBuilder.Entity("net_api.Models.InventoryItem", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("EntityId")
                        .IsRequired();

                    b.Property<string>("ItemId")
                        .IsRequired();

                    b.Property<int>("Quantity");

                    b.HasKey("Id");

                    b.HasIndex("EntityId");

                    b.HasIndex("ItemId");

                    b.ToTable("InventoryItems");
                });

            modelBuilder.Entity("net_api.Models.Item", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CampaignId")
                        .IsRequired();

                    b.Property<double>("Cost");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(3000);

                    b.Property<string>("ImageId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<int>("Rarity");

                    b.Property<string[]>("Tags")
                        .HasColumnName("Tags")
                        .HasColumnType("varchar[]");

                    b.Property<double>("Weight");

                    b.HasKey("Id");

                    b.HasIndex("CampaignId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("net_api.Models.Notification", b =>
                {
                    b.Property<string>("Id")
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

                    b.Property<string>("CampaignId")
                        .IsRequired();

                    b.HasIndex("CampaignId");

                    b.HasDiscriminator().HasValue("CampaignNotification");
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
                        .WithMany()
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.CampaignUser", b =>
                {
                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany("Members")
                        .HasForeignKey("CampaignId");

                    b.HasOne("net_api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("net_api.Models.Entity", b =>
                {
                    b.HasOne("net_api.Models.Campaign")
                        .WithMany("Entities")
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("net_api.Models.EntityPreset", "Preset")
                        .WithMany()
                        .HasForeignKey("EntityPresetId")
                        .OnDelete(DeleteBehavior.Cascade);

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
                });

            modelBuilder.Entity("net_api.Models.Notification", b =>
                {
                    b.HasOne("net_api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("net_api.Models.CampaignNotification", b =>
                {
                    b.HasOne("net_api.Models.Campaign", "Campaign")
                        .WithMany()
                        .HasForeignKey("CampaignId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
