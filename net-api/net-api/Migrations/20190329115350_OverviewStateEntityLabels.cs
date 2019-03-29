using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class OverviewStateEntityLabels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EntityLabels",
                table: "OverviewState",
                type: "JSONB",
                nullable: false,
                defaultValue: "{}");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EntityLabels",
                table: "OverviewState");
        }
    }
}
