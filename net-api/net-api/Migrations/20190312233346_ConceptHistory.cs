using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class ConceptHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConceptHistories",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    DateTime = table.Column<DateTime>(nullable: false, defaultValue: new DateTime().ToUniversalTime()),
                    ActionType = table.Column<int>(nullable: false),
                    ActionSource = table.Column<int>(nullable: false),
                    ConceptId = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    Content = table.Column<string>(type: "JSONB", nullable: true),
                    ImageId = table.Column<string>(nullable: true),
                    Fields = table.Column<string>(type: "JSONB", nullable: true),
                    Tags = table.Column<string[]>(type: "varchar[]", nullable: true),
                    ConceptTypeId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConceptHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConceptHistories_Concepts_ConceptId",
                        column: x => x.ConceptId,
                        principalTable: "Concepts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConceptHistories_ConceptTypes_ConceptTypeId",
                        column: x => x.ConceptTypeId,
                        principalTable: "ConceptTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConceptHistories_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConceptHistories_ConceptId",
                table: "ConceptHistories",
                column: "ConceptId");

            migrationBuilder.CreateIndex(
                name: "IX_ConceptHistories_ConceptTypeId",
                table: "ConceptHistories",
                column: "ConceptTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ConceptHistories_UserId",
                table: "ConceptHistories",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConceptHistories");
        }
    }
}
