using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class MapNotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Lat",
                table: "Notes",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Lng",
                table: "Notes",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "MapId",
                table: "Notes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "Lng",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "MapId",
                table: "Notes");
        }
    }
}
