using Microsoft.EntityFrameworkCore.Migrations;

namespace LegoLog.Migrations
{
    public partial class AddPhotoURLToLego : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoURL",
                table: "Legos",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoURL",
                table: "Legos");
        }
    }
}
