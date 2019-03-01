using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class ItemsSpellsNotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "InventoryItems",
                type: "JSONB",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "EntitySpells",
                type: "JSONB",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "InventoryItems");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "EntitySpells");
        }
    }
}
