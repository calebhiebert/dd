using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class Articles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ThingsOfInterest_ThingsOfInterest_LocationId",
                table: "ThingsOfInterest");

            migrationBuilder.DropTable(
                name: "SellableItems");

            migrationBuilder.DropIndex(
                name: "IX_ThingsOfInterest_LocationId",
                table: "ThingsOfInterest");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "ThingsOfInterest");

            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "ThingsOfInterest");

            migrationBuilder.RenameColumn(
                name: "Discriminator",
                table: "ThingsOfInterest",
                newName: "UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "ThingsOfInterest",
                maxLength: 6000,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 3000,
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CampaignId",
                table: "ThingsOfInterest",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ThingsOfInterest_CampaignId",
                table: "ThingsOfInterest",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_ThingsOfInterest_UserId",
                table: "ThingsOfInterest",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ThingsOfInterest_Campaigns_CampaignId",
                table: "ThingsOfInterest",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ThingsOfInterest_Users_UserId",
                table: "ThingsOfInterest",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ThingsOfInterest_Campaigns_CampaignId",
                table: "ThingsOfInterest");

            migrationBuilder.DropForeignKey(
                name: "FK_ThingsOfInterest_Users_UserId",
                table: "ThingsOfInterest");

            migrationBuilder.DropIndex(
                name: "IX_ThingsOfInterest_CampaignId",
                table: "ThingsOfInterest");

            migrationBuilder.DropIndex(
                name: "IX_ThingsOfInterest_UserId",
                table: "ThingsOfInterest");

            migrationBuilder.DropColumn(
                name: "CampaignId",
                table: "ThingsOfInterest");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ThingsOfInterest",
                newName: "Discriminator");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "ThingsOfInterest",
                maxLength: 3000,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 6000,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "ThingsOfInterest",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LocationId",
                table: "ThingsOfInterest",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SellableItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CurrencyOverride = table.Column<double>(nullable: true),
                    ItemId = table.Column<Guid>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    ThingOfInterestId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SellableItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SellableItems_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SellableItems_ThingsOfInterest_ThingOfInterestId",
                        column: x => x.ThingOfInterestId,
                        principalTable: "ThingsOfInterest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ThingsOfInterest_LocationId",
                table: "ThingsOfInterest",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_SellableItems_ItemId",
                table: "SellableItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_SellableItems_ThingOfInterestId",
                table: "SellableItems",
                column: "ThingOfInterestId");

            migrationBuilder.AddForeignKey(
                name: "FK_ThingsOfInterest_ThingsOfInterest_LocationId",
                table: "ThingsOfInterest",
                column: "LocationId",
                principalTable: "ThingsOfInterest",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
