using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class MapShapes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Shapes",
                table: "Maps",
                type: "jsonb",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Shapes",
                table: "Maps");
        }
    }
}
