using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class TOI : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "PlayerVisible",
                table: "Items",
                nullable: false,
                defaultValue: true);

            migrationBuilder.CreateTable(
                name: "ThingsOfInterest",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    Description = table.Column<string>(maxLength: 3000, nullable: true),
                    LocationId = table.Column<string>(nullable: true),
                    ImageIds = table.Column<string[]>(type: "varchar[]", nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    Type = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThingsOfInterest", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ThingsOfInterest_ThingsOfInterest_LocationId",
                        column: x => x.LocationId,
                        principalTable: "ThingsOfInterest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SellableItems",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ItemId = table.Column<string>(nullable: false),
                    ThingOfInterestId = table.Column<string>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    CurrencyOverride = table.Column<double>(nullable: true)
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
                name: "IX_SellableItems_ItemId",
                table: "SellableItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_SellableItems_ThingOfInterestId",
                table: "SellableItems",
                column: "ThingOfInterestId");

            migrationBuilder.CreateIndex(
                name: "IX_ThingsOfInterest_LocationId",
                table: "ThingsOfInterest",
                column: "LocationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SellableItems");

            migrationBuilder.DropTable(
                name: "ThingsOfInterest");

            migrationBuilder.DropColumn(
                name: "PlayerVisible",
                table: "Items");
        }
    }
}
