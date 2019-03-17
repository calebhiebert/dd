using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class ArticleConcepts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ArticleConcepts",
                columns: table => new
                {
                    ArticleId = table.Column<Guid>(nullable: false),
                    ConceptId = table.Column<Guid>(nullable: false),
                    IsPurchasable = table.Column<bool>(nullable: false),
                    Currency = table.Column<string>(type: "JSONB", nullable: true),
                    Quantity = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArticleConcepts", x => new { x.ArticleId, x.ConceptId });
                    table.ForeignKey(
                        name: "FK_ArticleConcepts_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArticleConcepts_Concepts_ConceptId",
                        column: x => x.ConceptId,
                        principalTable: "Concepts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArticleConcepts_ConceptId",
                table: "ArticleConcepts",
                column: "ConceptId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArticleConcepts");
        }
    }
}
