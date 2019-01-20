using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class FieldsNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "XP",
                table: "Entities",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<double>(
                name: "Currency",
                table: "Entities",
                nullable: true,
                oldClrType: typeof(double));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "XP",
                table: "Entities",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "Currency",
                table: "Entities",
                nullable: false,
                oldClrType: typeof(double),
                oldNullable: true);
        }
    }
}
