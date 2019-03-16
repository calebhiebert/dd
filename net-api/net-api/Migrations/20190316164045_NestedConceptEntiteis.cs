using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class NestedConceptEntiteis : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Attributes",
                table: "EntityPresets");

            migrationBuilder.DropColumn(
                name: "Attributes",
                table: "Entities");

            migrationBuilder.AddColumn<bool>(
                name: "IsContainer",
                table: "Concepts",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "ParentConceptId",
                table: "ConceptEntities",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ParentEntityId",
                table: "ConceptEntities",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ConceptEntities_ParentConceptId_ParentEntityId",
                table: "ConceptEntities",
                columns: new[] { "ParentConceptId", "ParentEntityId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ConceptEntities_ConceptEntities_ParentConceptId_ParentEntit~",
                table: "ConceptEntities",
                columns: new[] { "ParentConceptId", "ParentEntityId" },
                principalTable: "ConceptEntities",
                principalColumns: new[] { "ConceptId", "EntityId" },
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ConceptEntities_ConceptEntities_ParentConceptId_ParentEntit~",
                table: "ConceptEntities");

            migrationBuilder.DropIndex(
                name: "IX_ConceptEntities_ParentConceptId_ParentEntityId",
                table: "ConceptEntities");

            migrationBuilder.DropColumn(
                name: "IsContainer",
                table: "Concepts");

            migrationBuilder.DropColumn(
                name: "ParentConceptId",
                table: "ConceptEntities");

            migrationBuilder.DropColumn(
                name: "ParentEntityId",
                table: "ConceptEntities");

            migrationBuilder.AddColumn<string>(
                name: "Attributes",
                table: "EntityPresets",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Attributes",
                table: "Entities",
                type: "jsonb",
                nullable: true);
        }
    }
}
