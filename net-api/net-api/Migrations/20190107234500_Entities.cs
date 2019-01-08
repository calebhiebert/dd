using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class Entities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Entity",
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
                    table.PrimaryKey("PK_Entity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Entity_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Entity_EntityPresets_EntityPresetId",
                        column: x => x.EntityPresetId,
                        principalTable: "EntityPresets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Entity_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Entity_CampaignId",
                table: "Entity",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_Entity_EntityPresetId",
                table: "Entity",
                column: "EntityPresetId");

            migrationBuilder.CreateIndex(
                name: "IX_Entity_UserId",
                table: "Entity",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Entity");
        }
    }
}
