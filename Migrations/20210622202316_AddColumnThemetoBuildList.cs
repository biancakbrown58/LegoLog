using Microsoft.EntityFrameworkCore.Migrations;

namespace LegoLog.Migrations
{
    public partial class AddColumnThemetoBuildList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Theme",
                table: "BuildLists",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Theme",
                table: "BuildLists");
        }
    }
}
