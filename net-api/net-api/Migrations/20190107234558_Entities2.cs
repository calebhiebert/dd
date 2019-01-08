using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class Entities2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entity_Campaigns_CampaignId",
                table: "Entity");

            migrationBuilder.DropForeignKey(
                name: "FK_Entity_EntityPresets_EntityPresetId",
                table: "Entity");

            migrationBuilder.DropForeignKey(
                name: "FK_Entity_Users_UserId",
                table: "Entity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Entity",
                table: "Entity");

            migrationBuilder.RenameTable(
                name: "Entity",
                newName: "Entities");

            migrationBuilder.RenameIndex(
                name: "IX_Entity_UserId",
                table: "Entities",
                newName: "IX_Entities_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Entity_EntityPresetId",
                table: "Entities",
                newName: "IX_Entities_EntityPresetId");

            migrationBuilder.RenameIndex(
                name: "IX_Entity_CampaignId",
                table: "Entities",
                newName: "IX_Entities_CampaignId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Entities",
                table: "Entities",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Entities_Campaigns_CampaignId",
                table: "Entities",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Entities_EntityPresets_EntityPresetId",
                table: "Entities",
                column: "EntityPresetId",
                principalTable: "EntityPresets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Entities_Users_UserId",
                table: "Entities",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entities_Campaigns_CampaignId",
                table: "Entities");

            migrationBuilder.DropForeignKey(
                name: "FK_Entities_EntityPresets_EntityPresetId",
                table: "Entities");

            migrationBuilder.DropForeignKey(
                name: "FK_Entities_Users_UserId",
                table: "Entities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Entities",
                table: "Entities");

            migrationBuilder.RenameTable(
                name: "Entities",
                newName: "Entity");

            migrationBuilder.RenameIndex(
                name: "IX_Entities_UserId",
                table: "Entity",
                newName: "IX_Entity_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Entities_EntityPresetId",
                table: "Entity",
                newName: "IX_Entity_EntityPresetId");

            migrationBuilder.RenameIndex(
                name: "IX_Entities_CampaignId",
                table: "Entity",
                newName: "IX_Entity_CampaignId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Entity",
                table: "Entity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Entity_Campaigns_CampaignId",
                table: "Entity",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Entity_EntityPresets_EntityPresetId",
                table: "Entity",
                column: "EntityPresetId",
                principalTable: "EntityPresets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Entity_Users_UserId",
                table: "Entity",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
