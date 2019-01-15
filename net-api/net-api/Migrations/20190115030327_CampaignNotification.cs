using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class CampaignNotification : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_InviteUserId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_InviteUserId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "Accepted",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "InviteUserId",
                table: "Notifications");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Accepted",
                table: "Notifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InviteUserId",
                table: "Notifications",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_InviteUserId",
                table: "Notifications",
                column: "InviteUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_InviteUserId",
                table: "Notifications",
                column: "InviteUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
