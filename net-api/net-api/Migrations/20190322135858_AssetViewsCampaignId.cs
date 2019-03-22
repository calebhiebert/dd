using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class AssetViewsCampaignId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssetViews_Campaigns_CampaignId",
                table: "AssetViews");

            migrationBuilder.AlterColumn<Guid>(
                name: "CampaignId",
                table: "AssetViews",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AssetViews_Campaigns_CampaignId",
                table: "AssetViews",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssetViews_Campaigns_CampaignId",
                table: "AssetViews");

            migrationBuilder.AlterColumn<Guid>(
                name: "CampaignId",
                table: "AssetViews",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddForeignKey(
                name: "FK_AssetViews_Campaigns_CampaignId",
                table: "AssetViews",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
