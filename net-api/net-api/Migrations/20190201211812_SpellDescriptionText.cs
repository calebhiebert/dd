using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class SpellDescriptionText : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Spells",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 6000);

            migrationBuilder.AddColumn<bool>(
                name: "PlayerVisible",
                table: "Spells",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlayerVisible",
                table: "Spells");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Spells",
                maxLength: 3000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");
        }
    }
}
