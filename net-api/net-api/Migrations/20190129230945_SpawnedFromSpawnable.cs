using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class SpawnedFromSpawnable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Campaigns_CampaignId",
                table: "Notes");

            migrationBuilder.AlterColumn<string>(
                name: "CampaignId",
                table: "Notes",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpawnedFromId",
                table: "Entities",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Entities_SpawnedFromId",
                table: "Entities",
                column: "SpawnedFromId");

            migrationBuilder.AddForeignKey(
                name: "FK_Entities_Entities_SpawnedFromId",
                table: "Entities",
                column: "SpawnedFromId",
                principalTable: "Entities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Campaigns_CampaignId",
                table: "Notes",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entities_Entities_SpawnedFromId",
                table: "Entities");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Campaigns_CampaignId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Entities_SpawnedFromId",
                table: "Entities");

            migrationBuilder.DropColumn(
                name: "SpawnedFromId",
                table: "Entities");

            migrationBuilder.AlterColumn<string>(
                name: "CampaignId",
                table: "Notes",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Campaigns_CampaignId",
                table: "Notes",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
