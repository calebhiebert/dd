using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class Items2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Campaigns_CampaignId",
                table: "Items");

            migrationBuilder.AlterColumn<string>(
                name: "CampaignId",
                table: "Items",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Campaigns_CampaignId",
                table: "Items",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Campaigns_CampaignId",
                table: "Items");

            migrationBuilder.AlterColumn<string>(
                name: "CampaignId",
                table: "Items",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Campaigns_CampaignId",
                table: "Items",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
