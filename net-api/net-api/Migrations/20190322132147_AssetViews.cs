using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace netapi.Migrations
{
    public partial class AssetViews : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AssetViews",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    UserId = table.Column<string>(nullable: false),
                    DateTime = table.Column<DateTime>(nullable: false),
                    ArticleId = table.Column<Guid>(nullable: true),
                    QuestId = table.Column<Guid>(nullable: true),
                    ConceptId = table.Column<Guid>(nullable: true),
                    EntityId = table.Column<Guid>(nullable: true),
                    MapId = table.Column<Guid>(nullable: true),
                    CampaignId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetViews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssetViews_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AssetViews_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AssetViews_Concepts_ConceptId",
                        column: x => x.ConceptId,
                        principalTable: "Concepts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AssetViews_Entities_EntityId",
                        column: x => x.EntityId,
                        principalTable: "Entities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AssetViews_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AssetViews_Quests_QuestId",
                        column: x => x.QuestId,
                        principalTable: "Quests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AssetViews_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssetViews_ArticleId",
                table: "AssetViews",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetViews_CampaignId",
                table: "AssetViews",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetViews_ConceptId",
                table: "AssetViews",
                column: "ConceptId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetViews_EntityId",
                table: "AssetViews",
                column: "EntityId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetViews_MapId",
                table: "AssetViews",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetViews_QuestId",
                table: "AssetViews",
                column: "QuestId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetViews_UserId",
                table: "AssetViews",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssetViews");
        }
    }
}
