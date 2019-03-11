using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class EntityCurrency : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Entities");

            migrationBuilder.AddColumn<string>(
                name: "CurrencyAmount",
                table: "Entities",
                type: "JSONB",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrencyAmount",
                table: "Entities");

            migrationBuilder.AddColumn<double>(
                name: "Currency",
                table: "Entities",
                nullable: true);
        }
    }
}
