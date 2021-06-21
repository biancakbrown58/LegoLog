using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LegoLog.Migrations
{
    public partial class AddBuildLists : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BuildListId",
                table: "Legos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "BuildLists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildLists", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Legos_BuildListId",
                table: "Legos",
                column: "BuildListId");

            migrationBuilder.AddForeignKey(
                name: "FK_Legos_BuildLists_BuildListId",
                table: "Legos",
                column: "BuildListId",
                principalTable: "BuildLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Legos_BuildLists_BuildListId",
                table: "Legos");

            migrationBuilder.DropTable(
                name: "BuildLists");

            migrationBuilder.DropIndex(
                name: "IX_Legos_BuildListId",
                table: "Legos");

            migrationBuilder.DropColumn(
                name: "BuildListId",
                table: "Legos");
        }
    }
}
