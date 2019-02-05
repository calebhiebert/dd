using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class MapChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "MinZoom",
                table: "Maps",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "MaxZoom",
                table: "Maps",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<bool>(
                name: "PlayerVisible",
                table: "Maps",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Maps",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlayerVisible",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Maps");

            migrationBuilder.AlterColumn<int>(
                name: "MinZoom",
                table: "Maps",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MaxZoom",
                table: "Maps",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
