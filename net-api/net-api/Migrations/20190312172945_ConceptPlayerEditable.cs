using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class ConceptPlayerEditable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "PlayerEditable",
                table: "ConceptTypes",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlayerEditable",
                table: "ConceptTypes");
        }
    }
}
