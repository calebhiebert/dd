using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class RemoveCurrencyType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrencyTypes",
                table: "Campaigns");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CurrencyTypes",
                table: "Campaigns",
                type: "jsonb",
                nullable: true);
        }
    }
}
