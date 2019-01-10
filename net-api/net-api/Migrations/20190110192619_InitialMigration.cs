using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Username = table.Column<string>(maxLength: 30, nullable: false),
                    PictureURL = table.Column<string>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CampaignInvites",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    CampaignId = table.Column<string>(nullable: false),
                    AcceptedUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CampaignInvites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CampaignInvites_Users_AcceptedUserId",
                        column: x => x.AcceptedUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Campaigns",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    Description = table.Column<string>(nullable: false),
                    ImageId = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    ExperienceTable = table.Column<long[]>(type: "bigint[]", nullable: true),
                    ItemTypes = table.Column<string>(type: "jsonb", nullable: true),
                    CurrencyTypes = table.Column<string>(type: "jsonb", nullable: true),
                    ItemRarityTable = table.Column<string>(type: "jsonb", nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Campaigns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Campaigns_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CampaignUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    CampaignId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CampaignUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CampaignUsers_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CampaignUsers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EntityPresets",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 20, nullable: false),
                    Description = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    ImageId = table.Column<string>(nullable: false),
                    PlayerCreatable = table.Column<bool>(nullable: false),
                    Attributes = table.Column<string>(type: "jsonb", nullable: true),
                    CampaignId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityPresets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EntityPresets_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EntityPresets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    Description = table.Column<string>(maxLength: 3000, nullable: false),
                    ImageId = table.Column<string>(nullable: true),
                    CampaignId = table.Column<string>(nullable: false),
                    Rarity = table.Column<int>(nullable: false),
                    Type = table.Column<string>(nullable: false),
                    Tags = table.Column<string[]>(type: "varchar[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Entities",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 20, nullable: false),
                    Description = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    CampaignId = table.Column<string>(nullable: false),
                    ImageId = table.Column<string>(nullable: true),
                    Attributes = table.Column<string>(type: "jsonb", nullable: true),
                    XP = table.Column<long>(nullable: false),
                    EntityPresetId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Entities_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Entities_EntityPresets_EntityPresetId",
                        column: x => x.EntityPresetId,
                        principalTable: "EntityPresets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Entities_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CampaignInvites_AcceptedUserId",
                table: "CampaignInvites",
                column: "AcceptedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Campaigns_UserId",
                table: "Campaigns",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignUsers_CampaignId",
                table: "CampaignUsers",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignUsers_UserId",
                table: "CampaignUsers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Entities_CampaignId",
                table: "Entities",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_Entities_EntityPresetId",
                table: "Entities",
                column: "EntityPresetId");

            migrationBuilder.CreateIndex(
                name: "IX_Entities_UserId",
                table: "Entities",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityPresets_CampaignId",
                table: "EntityPresets",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityPresets_UserId",
                table: "EntityPresets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_CampaignId",
                table: "Items",
                column: "CampaignId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CampaignInvites");

            migrationBuilder.DropTable(
                name: "CampaignUsers");

            migrationBuilder.DropTable(
                name: "Entities");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "EntityPresets");

            migrationBuilder.DropTable(
                name: "Campaigns");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
