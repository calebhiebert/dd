using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class SimplifySpells : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Area",
                table: "Spells");

            migrationBuilder.DropColumn(
                name: "AreaShape",
                table: "Spells");

            migrationBuilder.DropColumn(
                name: "DurationType",
                table: "Spells");

            migrationBuilder.DropColumn(
                name: "DurationValue",
                table: "Spells");

            migrationBuilder.DropColumn(
                name: "Range",
                table: "Spells");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Area",
                table: "Spells",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AreaShape",
                table: "Spells",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DurationType",
                table: "Spells",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "DurationValue",
                table: "Spells",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Range",
                table: "Spells",
                nullable: true);
        }
    }
}
