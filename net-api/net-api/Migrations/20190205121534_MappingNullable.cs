using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class MappingNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
            name: "Mapping",
            table: "Maps",
            nullable: true,
            type: "JSONB",
            oldClrType: typeof(string));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
