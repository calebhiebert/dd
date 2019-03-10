using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class EntityConceptTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid[]>(
                name: "ConceptTypesEnabled",
                table: "EntityPresets",
                type: "UUID[]",
                nullable: false,
                defaultValue: new Guid[] {  });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConceptTypesEnabled",
                table: "EntityPresets");
        }
    }
}
