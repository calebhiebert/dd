using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class SuggestionNotifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SuggestedById",
                table: "Notifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SuggestionURL",
                table: "Notifications",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_SuggestedById",
                table: "Notifications",
                column: "SuggestedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_SuggestedById",
                table: "Notifications",
                column: "SuggestedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_SuggestedById",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_SuggestedById",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "SuggestedById",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "SuggestionURL",
                table: "Notifications");
        }
    }
}
