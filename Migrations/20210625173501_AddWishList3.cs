using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LegoLog.Migrations
{
    public partial class AddWishList3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Legos_BuildList_BuildListId",
                table: "Legos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BuildList",
                table: "BuildList");

            migrationBuilder.RenameTable(
                name: "BuildList",
                newName: "BuildLists");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BuildLists",
                table: "BuildLists",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "WishLists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Theme = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WishLists", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Legos_WishListId",
                table: "Legos",
                column: "WishListId");

            migrationBuilder.AddForeignKey(
                name: "FK_Legos_BuildLists_BuildListId",
                table: "Legos",
                column: "BuildListId",
                principalTable: "BuildLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Legos_WishLists_WishListId",
                table: "Legos",
                column: "WishListId",
                principalTable: "WishLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Legos_BuildLists_BuildListId",
                table: "Legos");

            migrationBuilder.DropForeignKey(
                name: "FK_Legos_WishLists_WishListId",
                table: "Legos");

            migrationBuilder.DropTable(
                name: "WishLists");

            migrationBuilder.DropIndex(
                name: "IX_Legos_WishListId",
                table: "Legos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BuildLists",
                table: "BuildLists");

            migrationBuilder.RenameTable(
                name: "BuildLists",
                newName: "BuildList");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BuildList",
                table: "BuildList",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Legos_BuildList_BuildListId",
                table: "Legos",
                column: "BuildListId",
                principalTable: "BuildList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
