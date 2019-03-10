using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class RemoveItemsAndSpells : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EntitySpells");

            migrationBuilder.DropTable(
                name: "InventoryItems");

            migrationBuilder.DropTable(
                name: "Spells");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropColumn(
                name: "IsInventoryEnabled",
                table: "EntityPresets");

            migrationBuilder.DropColumn(
                name: "IsSpellsetsEnabled",
                table: "EntityPresets");

            migrationBuilder.DropColumn(
                name: "ItemRarityTable",
                table: "Campaigns");

            migrationBuilder.DropColumn(
                name: "PlayersCanEditItems",
                table: "Campaigns");

            migrationBuilder.DropColumn(
                name: "PlayersCanEditSpells",
                table: "Campaigns");

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "ConceptEntities",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsInventoryEnabled",
                table: "EntityPresets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSpellsetsEnabled",
                table: "EntityPresets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "ConceptEntities",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemRarityTable",
                table: "Campaigns",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PlayersCanEditItems",
                table: "Campaigns",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PlayersCanEditSpells",
                table: "Campaigns",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CampaignId = table.Column<Guid>(nullable: false),
                    Content = table.Column<string>(type: "JSONB", nullable: true),
                    Cost = table.Column<double>(nullable: false),
                    ImageId = table.Column<string>(nullable: true),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    PlayerVisible = table.Column<bool>(nullable: false),
                    Rarity = table.Column<int>(nullable: false),
                    Tags = table.Column<string[]>(type: "varchar[]", nullable: true),
                    UserId = table.Column<string>(nullable: false),
                    Weight = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Items_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Spells",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CampaignId = table.Column<Guid>(nullable: false),
                    Content = table.Column<string>(type: "JSONB", nullable: true),
                    ImageId = table.Column<string>(nullable: true),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    PlayerVisible = table.Column<bool>(nullable: false),
                    Tags = table.Column<string[]>(type: "varchar[]", nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spells", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Spells_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Spells_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InventoryItems",
                columns: table => new
                {
                    EntityId = table.Column<Guid>(nullable: false),
                    ItemId = table.Column<Guid>(nullable: false),
                    Content = table.Column<string>(type: "JSONB", nullable: true),
                    Quantity = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryItems", x => new { x.EntityId, x.ItemId });
                    table.ForeignKey(
                        name: "FK_InventoryItems_Entities_EntityId",
                        column: x => x.EntityId,
                        principalTable: "Entities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InventoryItems_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EntitySpells",
                columns: table => new
                {
                    EntityId = table.Column<Guid>(nullable: false),
                    SpellId = table.Column<Guid>(nullable: false),
                    Content = table.Column<string>(type: "JSONB", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntitySpells", x => new { x.EntityId, x.SpellId });
                    table.ForeignKey(
                        name: "FK_EntitySpells_Entities_EntityId",
                        column: x => x.EntityId,
                        principalTable: "Entities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EntitySpells_Spells_SpellId",
                        column: x => x.SpellId,
                        principalTable: "Spells",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EntitySpells_SpellId",
                table: "EntitySpells",
                column: "SpellId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryItems_ItemId",
                table: "InventoryItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_CampaignId",
                table: "Items",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_UserId",
                table: "Items",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Spells_CampaignId",
                table: "Spells",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_Spells_UserId",
                table: "Spells",
                column: "UserId");
        }
    }
}
