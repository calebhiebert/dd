using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class OverviewStateEntityConcepts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EntityConcepts",
                table: "OverviewState",
                type: "JSONB",
                nullable: false,
                defaultValue: "{}");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EntityConcepts",
                table: "OverviewState");
        }
    }
}
