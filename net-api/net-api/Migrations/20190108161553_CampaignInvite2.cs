using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class CampaignInvite2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InviteToken",
                table: "CampaignInvites");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InviteToken",
                table: "CampaignInvites",
                nullable: true);
        }
    }
}
