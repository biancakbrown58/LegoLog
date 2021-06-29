using Microsoft.EntityFrameworkCore.Migrations;

namespace LegoLog.Migrations
{
    public partial class RemovingColumnsFromBuildList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "BuildLists");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "BuildLists");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "BuildLists",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "BuildLists",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
