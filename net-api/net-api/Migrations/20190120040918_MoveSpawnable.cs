using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class MoveSpawnable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Spawnable",
                table: "EntityPresets");

            migrationBuilder.AddColumn<bool>(
                name: "Spawnable",
                table: "Entities",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Spawnable",
                table: "Entities");

            migrationBuilder.AddColumn<bool>(
                name: "Spawnable",
                table: "EntityPresets",
                nullable: false,
                defaultValue: false);
        }
    }
}
