using Microsoft.EntityFrameworkCore.Migrations;

namespace LegoLog.Migrations
{
    public partial class AddWishList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Legos_BuildLists_BuildListId",
                table: "Legos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BuildLists",
                table: "BuildLists");

            migrationBuilder.RenameTable(
                name: "BuildLists",
                newName: "BuildList");

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Legos",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "FinishedLego",
                table: "Legos",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "InProgress",
                table: "Legos",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Price",
                table: "Legos",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Legos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WishListId",
                table: "Legos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Legos_BuildList_BuildListId",
                table: "Legos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BuildList",
                table: "BuildList");

            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Legos");

            migrationBuilder.DropColumn(
                name: "FinishedLego",
                table: "Legos");

            migrationBuilder.DropColumn(
                name: "InProgress",
                table: "Legos");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Legos");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Legos");

            migrationBuilder.DropColumn(
                name: "WishListId",
                table: "Legos");

            migrationBuilder.RenameTable(
                name: "BuildList",
                newName: "BuildLists");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BuildLists",
                table: "BuildLists",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Legos_BuildLists_BuildListId",
                table: "Legos",
                column: "BuildListId",
                principalTable: "BuildLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
