using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class NotesOnArticles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ArticleId",
                table: "Notes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notes_ArticleId",
                table: "Notes",
                column: "ArticleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Articles_ArticleId",
                table: "Notes",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Articles_ArticleId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_ArticleId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "ArticleId",
                table: "Notes");
        }
    }
}
