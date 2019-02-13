using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class ArticleUpdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageIds",
                table: "ThingsOfInterest");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "ThingsOfInterest",
                newName: "Text");

            migrationBuilder.AddColumn<bool>(
                name: "Published",
                table: "ThingsOfInterest",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Published",
                table: "ThingsOfInterest");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "ThingsOfInterest",
                newName: "Description");

            migrationBuilder.AddColumn<string[]>(
                name: "ImageIds",
                table: "ThingsOfInterest",
                type: "varchar[]",
                nullable: true);
        }
    }
}
