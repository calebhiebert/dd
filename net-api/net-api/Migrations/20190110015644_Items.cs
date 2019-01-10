using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class Items : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CurrencyTypes",
                table: "Campaigns",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemTypes",
                table: "Campaigns",
                type: "jsonb",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    Description = table.Column<string>(maxLength: 3000, nullable: false),
                    ImageId = table.Column<string>(nullable: true),
                    Rarity = table.Column<int>(nullable: false),
                    Type = table.Column<string>(nullable: false),
                    Tags = table.Column<List<string>>(type: "varchar[]", nullable: true),
                    CampaignId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_CampaignId",
                table: "Items",
                column: "CampaignId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropColumn(
                name: "CurrencyTypes",
                table: "Campaigns");

            migrationBuilder.DropColumn(
                name: "ItemTypes",
                table: "Campaigns");
        }
    }
}
