using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class OverviewState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OverviewStateId",
                table: "Campaigns",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OverviewState",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntitySortOrder = table.Column<string>(type: "JSONB", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OverviewState", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Campaigns_OverviewStateId",
                table: "Campaigns",
                column: "OverviewStateId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Campaigns_OverviewState_OverviewStateId",
                table: "Campaigns",
                column: "OverviewStateId",
                principalTable: "OverviewState",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Campaigns_OverviewState_OverviewStateId",
                table: "Campaigns");

            migrationBuilder.DropTable(
                name: "OverviewState");

            migrationBuilder.DropIndex(
                name: "IX_Campaigns_OverviewStateId",
                table: "Campaigns");

            migrationBuilder.DropColumn(
                name: "OverviewStateId",
                table: "Campaigns");
        }
    }
}
