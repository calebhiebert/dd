using Microsoft.EntityFrameworkCore.Migrations;

namespace netapi.Migrations
{
    public partial class ConceptArticleTrackOnEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "TrackOnEntity",
                table: "ArticleConcepts",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrackOnEntity",
                table: "ArticleConcepts");
        }
    }
}
