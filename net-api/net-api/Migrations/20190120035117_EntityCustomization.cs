using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class EntityCustomization : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCurrencyEnabled",
                table: "EntityPresets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHealthEnabled",
                table: "EntityPresets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsInventoryEnabled",
                table: "EntityPresets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsXPEnabled",
                table: "EntityPresets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Spawnable",
                table: "EntityPresets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "Health",
                table: "Entities",
                type: "jsonb",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "jsonb");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCurrencyEnabled",
                table: "EntityPresets");

            migrationBuilder.DropColumn(
                name: "IsHealthEnabled",
                table: "EntityPresets");

            migrationBuilder.DropColumn(
                name: "IsInventoryEnabled",
                table: "EntityPresets");

            migrationBuilder.DropColumn(
                name: "IsXPEnabled",
                table: "EntityPresets");

            migrationBuilder.DropColumn(
                name: "Spawnable",
                table: "EntityPresets");

            migrationBuilder.AlterColumn<string>(
                name: "Health",
                table: "Entities",
                type: "jsonb",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb",
                oldNullable: true);
        }
    }
}
