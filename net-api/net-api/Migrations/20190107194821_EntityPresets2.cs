using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class EntityPresets2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "EntityAttributes",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    Description = table.Column<string>(maxLength: 150, nullable: true),
                    ImageId = table.Column<string>(nullable: true),
                    DefaultValue = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false),
                    Options = table.Column<string[]>(type: "varchar[]", nullable: true),
                    Class = table.Column<int>(nullable: false),
                    Required = table.Column<bool>(nullable: false),
                    EntityPresetId = table.Column<string>(nullable: false),
                    Max = table.Column<double>(nullable: false),
                    Min = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityAttributes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EntityAttributes_EntityPresets_EntityPresetId",
                        column: x => x.EntityPresetId,
                        principalTable: "EntityPresets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EntityAttributes_EntityPresetId",
                table: "EntityAttributes",
                column: "EntityPresetId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityPresets_CampaignId",
                table: "EntityPresets",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityPresets_UserId",
                table: "EntityPresets",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EntityAttributes");

            migrationBuilder.DropTable(
                name: "EntityPresets");
        }
    }
}
