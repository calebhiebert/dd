using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class QuillNotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Entities_EntityId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_EntityPresets_EntityPresetId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Users_UserId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_EntityId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_EntityPresetId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "EntityId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "EntityPresetId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "Text",
                table: "Notes");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Notes",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Notes",
                type: "JSONB",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Users_UserId",
                table: "Notes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Users_UserId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Notes");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Notes",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<Guid>(
                name: "EntityId",
                table: "Notes",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "EntityPresetId",
                table: "Notes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "Notes",
                maxLength: 3000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_EntityId",
                table: "Notes",
                column: "EntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_EntityPresetId",
                table: "Notes",
                column: "EntityPresetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Entities_EntityId",
                table: "Notes",
                column: "EntityId",
                principalTable: "Entities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_EntityPresets_EntityPresetId",
                table: "Notes",
                column: "EntityPresetId",
                principalTable: "EntityPresets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Users_UserId",
                table: "Notes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
