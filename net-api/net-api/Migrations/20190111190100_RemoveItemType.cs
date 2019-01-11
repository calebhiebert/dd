using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class RemoveItemType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ItemTypes",
                table: "Campaigns");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignInvites_CampaignId",
                table: "CampaignInvites",
                column: "CampaignId");

            migrationBuilder.AddForeignKey(
                name: "FK_CampaignInvites_Campaigns_CampaignId",
                table: "CampaignInvites",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CampaignInvites_Campaigns_CampaignId",
                table: "CampaignInvites");

            migrationBuilder.DropIndex(
                name: "IX_CampaignInvites_CampaignId",
                table: "CampaignInvites");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Items",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ItemTypes",
                table: "Campaigns",
                type: "jsonb",
                nullable: true);
        }
    }
}
