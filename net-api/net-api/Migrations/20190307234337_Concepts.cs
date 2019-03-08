using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class Concepts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Concepts",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    Content = table.Column<string>(type: "JSONB", nullable: true),
                    UserId = table.Column<string>(nullable: false),
                    Fields = table.Column<string>(type: "JSONB", nullable: true),
                    Tags = table.Column<string[]>(type: "varchar[]", nullable: true),
                    ConceptTypeId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Concepts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Concepts_ConceptTypes_ConceptTypeId",
                        column: x => x.ConceptTypeId,
                        principalTable: "ConceptTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Concepts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Concepts_ConceptTypeId",
                table: "Concepts",
                column: "ConceptTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Concepts_UserId",
                table: "Concepts",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Concepts");
        }
    }
}
