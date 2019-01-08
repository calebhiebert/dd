using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class CampaignUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateIndex(
                name: "IX_CampaignUsers_CampaignId",
                table: "CampaignUsers",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignUsers_UserId",
                table: "CampaignUsers",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CampaignUsers");
        }
    }
}
