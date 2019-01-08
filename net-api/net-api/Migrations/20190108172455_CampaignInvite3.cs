using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class CampaignInvite3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CampaignId",
                table: "CampaignInvites",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AcceptedUserId",
                table: "CampaignInvites",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "CampaignInvites",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "CampaignInvites",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "CampaignInvites",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CampaignInvites_AcceptedUserId",
                table: "CampaignInvites",
                column: "AcceptedUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CampaignInvites_Users_AcceptedUserId",
                table: "CampaignInvites",
                column: "AcceptedUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CampaignInvites_Users_AcceptedUserId",
                table: "CampaignInvites");

            migrationBuilder.DropIndex(
                name: "IX_CampaignInvites_AcceptedUserId",
                table: "CampaignInvites");

            migrationBuilder.DropColumn(
                name: "AcceptedUserId",
                table: "CampaignInvites");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "CampaignInvites");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "CampaignInvites");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "CampaignInvites");

            migrationBuilder.AlterColumn<string>(
                name: "CampaignId",
                table: "CampaignInvites",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
