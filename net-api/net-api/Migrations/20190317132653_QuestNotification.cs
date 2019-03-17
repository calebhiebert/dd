using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class QuestNotification : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "QuestId",
                table: "Notifications",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_QuestId",
                table: "Notifications",
                column: "QuestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Quests_QuestId",
                table: "Notifications",
                column: "QuestId",
                principalTable: "Quests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Quests_QuestId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_QuestId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "QuestId",
                table: "Notifications");
        }
    }
}
