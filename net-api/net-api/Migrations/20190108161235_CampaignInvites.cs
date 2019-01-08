using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class CampaignInvites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CampaignInvites",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    CampaignId = table.Column<string>(nullable: true),
                    InviteToken = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CampaignInvites", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CampaignInvites");
        }
    }
}
