using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class NoteMapShapes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MapShape",
                table: "Notes",
                type: "JSONB",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MapShape",
                table: "Notes");
        }
    }
}
