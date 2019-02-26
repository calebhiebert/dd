using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class QuestQuillContent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "AcceptedAt",
                table: "Quests",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Quests",
                type: "JSONB",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "Quests");

            migrationBuilder.AlterColumn<DateTime>(
                name: "AcceptedAt",
                table: "Quests",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);
        }
    }
}
