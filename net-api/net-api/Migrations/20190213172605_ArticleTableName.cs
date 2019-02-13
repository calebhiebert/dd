using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class ArticleTableName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ThingsOfInterest_Campaigns_CampaignId",
                table: "ThingsOfInterest");

            migrationBuilder.DropForeignKey(
                name: "FK_ThingsOfInterest_Users_UserId",
                table: "ThingsOfInterest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ThingsOfInterest",
                table: "ThingsOfInterest");

            migrationBuilder.RenameTable(
                name: "ThingsOfInterest",
                newName: "Articles");

            migrationBuilder.RenameIndex(
                name: "IX_ThingsOfInterest_UserId",
                table: "Articles",
                newName: "IX_Articles_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ThingsOfInterest_CampaignId",
                table: "Articles",
                newName: "IX_Articles_CampaignId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Articles",
                table: "Articles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Campaigns_CampaignId",
                table: "Articles",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Users_UserId",
                table: "Articles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Campaigns_CampaignId",
                table: "Articles");

            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Users_UserId",
                table: "Articles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Articles",
                table: "Articles");

            migrationBuilder.RenameTable(
                name: "Articles",
                newName: "ThingsOfInterest");

            migrationBuilder.RenameIndex(
                name: "IX_Articles_UserId",
                table: "ThingsOfInterest",
                newName: "IX_ThingsOfInterest_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Articles_CampaignId",
                table: "ThingsOfInterest",
                newName: "IX_ThingsOfInterest_CampaignId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ThingsOfInterest",
                table: "ThingsOfInterest",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ThingsOfInterest_Campaigns_CampaignId",
                table: "ThingsOfInterest",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ThingsOfInterest_Users_UserId",
                table: "ThingsOfInterest",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
