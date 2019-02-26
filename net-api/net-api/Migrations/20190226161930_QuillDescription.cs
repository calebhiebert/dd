using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class QuillDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Quests");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Quests",
                maxLength: 6000,
                nullable: false,
                defaultValue: "");
        }
    }
}
