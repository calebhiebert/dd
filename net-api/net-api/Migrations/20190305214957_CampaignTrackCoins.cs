using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class CampaignTrackCoins : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "TrackCoins",
                table: "Campaigns",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrackCoins",
                table: "Campaigns");
        }
    }
}
