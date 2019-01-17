using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class EntityHealth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Health",
                table: "Entities",
                type: "jsonb",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Health",
                table: "Entities");
        }
    }
}
