using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class RemoveEntityAttributes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EntityAttributes");

            migrationBuilder.AddColumn<string>(
                name: "Attributes",
                table: "EntityPresets",
                type: "jsonb",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Attributes",
                table: "EntityPresets");

            migrationBuilder.CreateTable(
                name: "EntityAttributes",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Class = table.Column<int>(nullable: false),
                    DefaultValue = table.Column<string>(nullable: true),
                    Description = table.Column<string>(maxLength: 150, nullable: true),
                    EntityPresetId = table.Column<string>(nullable: false),
                    ImageId = table.Column<string>(nullable: true),
                    Max = table.Column<double>(nullable: false),
                    Min = table.Column<double>(nullable: false),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    Options = table.Column<string[]>(type: "varchar[]", nullable: true),
                    Required = table.Column<bool>(nullable: false),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityAttributes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EntityAttributes_EntityPresets_EntityPresetId",
                        column: x => x.EntityPresetId,
                        principalTable: "EntityPresets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EntityAttributes_EntityPresetId",
                table: "EntityAttributes",
                column: "EntityPresetId");
        }
    }
}
