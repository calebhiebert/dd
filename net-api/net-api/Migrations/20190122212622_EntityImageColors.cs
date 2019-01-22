using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class EntityImageColors : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageColor1",
                table: "Entities",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageColor2",
                table: "Entities",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageColor1",
                table: "Entities");

            migrationBuilder.DropColumn(
                name: "ImageColor2",
                table: "Entities");
        }
    }
}
