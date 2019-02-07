using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class MapNotifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "MapId",
                table: "Notifications",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_MapId",
                table: "Notifications",
                column: "MapId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Maps_MapId",
                table: "Notifications",
                column: "MapId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Maps_MapId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_MapId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "MapId",
                table: "Notifications");
        }
    }
}
