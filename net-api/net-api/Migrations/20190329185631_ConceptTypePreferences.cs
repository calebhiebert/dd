using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class ConceptTypePreferences : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsLinkableToArticles",
                table: "ConceptTypes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsShownInNavigationMenu",
                table: "ConceptTypes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsUsableInOverviewScreen",
                table: "ConceptTypes",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsLinkableToArticles",
                table: "ConceptTypes");

            migrationBuilder.DropColumn(
                name: "IsShownInNavigationMenu",
                table: "ConceptTypes");

            migrationBuilder.DropColumn(
                name: "IsUsableInOverviewScreen",
                table: "ConceptTypes");
        }
    }
}
