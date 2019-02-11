using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class MapNoteForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Notes_MapId",
                table: "Notes",
                column: "MapId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Maps_MapId",
                table: "Notes",
                column: "MapId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Maps_MapId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_MapId",
                table: "Notes");
        }
    }
}
