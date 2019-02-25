using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class QuestUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Active",
                table: "Quests",
                newName: "Available");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Quests",
                maxLength: 6000,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 3000);

            migrationBuilder.AddColumn<bool>(
                name: "Accepted",
                table: "Quests",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "AcceptedAt",
                table: "Quests",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OriginId",
                table: "Quests",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Quests",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Quests_OriginId",
                table: "Quests",
                column: "OriginId");

            migrationBuilder.AddForeignKey(
                name: "FK_Quests_Articles_OriginId",
                table: "Quests",
                column: "OriginId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quests_Articles_OriginId",
                table: "Quests");

            migrationBuilder.DropIndex(
                name: "IX_Quests_OriginId",
                table: "Quests");

            migrationBuilder.DropColumn(
                name: "Accepted",
                table: "Quests");

            migrationBuilder.DropColumn(
                name: "AcceptedAt",
                table: "Quests");

            migrationBuilder.DropColumn(
                name: "OriginId",
                table: "Quests");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Quests");

            migrationBuilder.RenameColumn(
                name: "Available",
                table: "Quests",
                newName: "Active");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Quests",
                maxLength: 3000,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 6000);
        }
    }
}
