using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class EntityPresetSpellsets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSpellsetsEnabled",
                table: "EntityPresets",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSpellsetsEnabled",
                table: "EntityPresets");
        }
    }
}
