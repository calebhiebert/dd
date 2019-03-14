using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class ConceptEntitySortValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SortValue",
                table: "ConceptEntities",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SortValue",
                table: "ConceptEntities");
        }
    }
}
