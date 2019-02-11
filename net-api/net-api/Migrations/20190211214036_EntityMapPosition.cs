using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class EntityMapPosition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Lat",
                table: "Entities",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Lng",
                table: "Entities",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "MapId",
                table: "Entities",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Entities");

            migrationBuilder.DropColumn(
                name: "Lng",
                table: "Entities");

            migrationBuilder.DropColumn(
                name: "MapId",
                table: "Entities");
        }
    }
}
