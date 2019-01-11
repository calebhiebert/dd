using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class ItemCostAndWeight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Cost",
                table: "Items",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "Items",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cost",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Items");
        }
    }
}
