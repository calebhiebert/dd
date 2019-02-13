using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class ArticleMapping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Lat",
                table: "Articles",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Lng",
                table: "Articles",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "MapId",
                table: "Articles",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Articles_MapId",
                table: "Articles",
                column: "MapId");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Maps_MapId",
                table: "Articles",
                column: "MapId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Maps_MapId",
                table: "Articles");

            migrationBuilder.DropIndex(
                name: "IX_Articles_MapId",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "Lng",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "MapId",
                table: "Articles");
        }
    }
}
