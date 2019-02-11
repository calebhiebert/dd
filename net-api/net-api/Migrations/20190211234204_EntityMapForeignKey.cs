using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class EntityMapForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Entities_MapId",
                table: "Entities",
                column: "MapId");

            migrationBuilder.AddForeignKey(
                name: "FK_Entities_Maps_MapId",
                table: "Entities",
                column: "MapId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entities_Maps_MapId",
                table: "Entities");

            migrationBuilder.DropIndex(
                name: "IX_Entities_MapId",
                table: "Entities");
        }
    }
}
