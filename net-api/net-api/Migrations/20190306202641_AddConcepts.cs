using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class AddConcepts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConceptTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    Description = table.Column<string>(maxLength: 100, nullable: true),
                    UserId = table.Column<string>(nullable: false),
                    Icon = table.Column<string>(nullable: true),
                    Fields = table.Column<string>(type: "JSONB", nullable: false),
                    CampaignId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConceptTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConceptTypes_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConceptTypes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConceptTypes_CampaignId",
                table: "ConceptTypes",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_ConceptTypes_UserId",
                table: "ConceptTypes",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConceptTypes");
        }
    }
}
