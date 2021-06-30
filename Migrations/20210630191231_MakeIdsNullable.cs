using Microsoft.EntityFrameworkCore.Migrations;

namespace LegoLog.Migrations
{
    public partial class MakeIdsNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Legos_BuildLists_BuildListId",
                table: "Legos");

            migrationBuilder.DropForeignKey(
                name: "FK_Legos_WishLists_WishListId",
                table: "Legos");

            migrationBuilder.AlterColumn<int>(
                name: "WishListId",
                table: "Legos",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "BuildListId",
                table: "Legos",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Legos_BuildLists_BuildListId",
                table: "Legos",
                column: "BuildListId",
                principalTable: "BuildLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Legos_WishLists_WishListId",
                table: "Legos",
                column: "WishListId",
                principalTable: "WishLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Legos_BuildLists_BuildListId",
                table: "Legos");

            migrationBuilder.DropForeignKey(
                name: "FK_Legos_WishLists_WishListId",
                table: "Legos");

            migrationBuilder.AlterColumn<int>(
                name: "WishListId",
                table: "Legos",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BuildListId",
                table: "Legos",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

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
    }
}
