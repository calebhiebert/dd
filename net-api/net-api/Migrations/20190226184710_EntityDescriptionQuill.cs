using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class EntityDescriptionQuill : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Entities");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Entities",
                type: "JSONB",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "Entities");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Entities",
                nullable: false,
                defaultValue: "");
        }
    }
}
