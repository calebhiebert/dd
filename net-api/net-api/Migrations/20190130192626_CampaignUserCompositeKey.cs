using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class CampaignUserCompositeKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CampaignUsers_Users_UserId",
                table: "CampaignUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CampaignUsers",
                table: "CampaignUsers");

            migrationBuilder.DropIndex(
                name: "IX_CampaignUsers_CampaignId",
                table: "CampaignUsers");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CampaignUsers");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "CampaignUsers",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CampaignUsers",
                table: "CampaignUsers",
                columns: new[] { "CampaignId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CampaignUsers_Users_UserId",
                table: "CampaignUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CampaignUsers_Users_UserId",
                table: "CampaignUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CampaignUsers",
                table: "CampaignUsers");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "CampaignUsers",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "CampaignUsers",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CampaignUsers",
                table: "CampaignUsers",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignUsers_CampaignId",
                table: "CampaignUsers",
                column: "CampaignId");

            migrationBuilder.AddForeignKey(
                name: "FK_CampaignUsers_Users_UserId",
                table: "CampaignUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
