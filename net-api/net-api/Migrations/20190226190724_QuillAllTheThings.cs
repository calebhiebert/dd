using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class QuillAllTheThings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Spells");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Campaigns");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Spells",
                type: "JSONB",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Items",
                type: "JSONB",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Campaigns",
                type: "JSONB",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "Spells");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Campaigns");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Spells",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Items",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Campaigns",
                nullable: false,
                defaultValue: "");
        }
    }
}
