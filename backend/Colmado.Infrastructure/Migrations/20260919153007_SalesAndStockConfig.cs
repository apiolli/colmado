using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Colmado.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SalesAndStockConfig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sale_Users_UserId",
                table: "Sale");

            migrationBuilder.DropForeignKey(
                name: "FK_SaleItem_Products_ProductId",
                table: "SaleItem");

            migrationBuilder.DropForeignKey(
                name: "FK_SaleItem_Sale_SaleId",
                table: "SaleItem");

            migrationBuilder.DropForeignKey(
                name: "FK_SaleItem_Users_UserId",
                table: "SaleItem");

            migrationBuilder.DropForeignKey(
                name: "FK_StockMovement_Products_ProductId",
                table: "StockMovement");

            migrationBuilder.DropForeignKey(
                name: "FK_StockMovement_Users_UserId",
                table: "StockMovement");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StockMovement",
                table: "StockMovement");

            migrationBuilder.DropIndex(
                name: "IX_StockMovement_UserId",
                table: "StockMovement");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SaleItem",
                table: "SaleItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Sale",
                table: "Sale");

            migrationBuilder.DropIndex(
                name: "IX_Sale_UserId",
                table: "Sale");

            migrationBuilder.RenameTable(
                name: "StockMovement",
                newName: "StockMovements");

            migrationBuilder.RenameTable(
                name: "SaleItem",
                newName: "SalesItems");

            migrationBuilder.RenameTable(
                name: "Sale",
                newName: "Sales");

            migrationBuilder.RenameIndex(
                name: "IX_StockMovement_ProductId",
                table: "StockMovements",
                newName: "IX_StockMovements_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_SaleItem_UserId",
                table: "SalesItems",
                newName: "IX_SalesItems_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_SaleItem_SaleId",
                table: "SalesItems",
                newName: "IX_SalesItems_SaleId");

            migrationBuilder.RenameIndex(
                name: "IX_SaleItem_ProductId",
                table: "SalesItems",
                newName: "IX_SalesItems_ProductId");

            migrationBuilder.AlterColumn<string>(
                name: "Reason",
                table: "StockMovements",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentMethod",
                table: "StockMovements",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Note",
                table: "StockMovements",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MovementType",
                table: "StockMovements",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentMethod",
                table: "Sales",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Customer",
                table: "Sales",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Sales",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StockMovements",
                table: "StockMovements",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SalesItems",
                table: "SalesItems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sales",
                table: "Sales",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_StockMovements_UserId_Date",
                table: "StockMovements",
                columns: new[] { "UserId", "Date" });

            migrationBuilder.CreateIndex(
                name: "IX_Sales_Code_UserId",
                table: "Sales",
                columns: new[] { "Code", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sales_UserId_Date",
                table: "Sales",
                columns: new[] { "UserId", "Date" });

            migrationBuilder.AddForeignKey(
                name: "FK_Sales_Users_UserId",
                table: "Sales",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SalesItems_Products_ProductId",
                table: "SalesItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SalesItems_Sales_SaleId",
                table: "SalesItems",
                column: "SaleId",
                principalTable: "Sales",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SalesItems_Users_UserId",
                table: "SalesItems",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StockMovements_Products_ProductId",
                table: "StockMovements",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StockMovements_Users_UserId",
                table: "StockMovements",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sales_Users_UserId",
                table: "Sales");

            migrationBuilder.DropForeignKey(
                name: "FK_SalesItems_Products_ProductId",
                table: "SalesItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SalesItems_Sales_SaleId",
                table: "SalesItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SalesItems_Users_UserId",
                table: "SalesItems");

            migrationBuilder.DropForeignKey(
                name: "FK_StockMovements_Products_ProductId",
                table: "StockMovements");

            migrationBuilder.DropForeignKey(
                name: "FK_StockMovements_Users_UserId",
                table: "StockMovements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StockMovements",
                table: "StockMovements");

            migrationBuilder.DropIndex(
                name: "IX_StockMovements_UserId_Date",
                table: "StockMovements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SalesItems",
                table: "SalesItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Sales",
                table: "Sales");

            migrationBuilder.DropIndex(
                name: "IX_Sales_Code_UserId",
                table: "Sales");

            migrationBuilder.DropIndex(
                name: "IX_Sales_UserId_Date",
                table: "Sales");

            migrationBuilder.RenameTable(
                name: "StockMovements",
                newName: "StockMovement");

            migrationBuilder.RenameTable(
                name: "SalesItems",
                newName: "SaleItem");

            migrationBuilder.RenameTable(
                name: "Sales",
                newName: "Sale");

            migrationBuilder.RenameIndex(
                name: "IX_StockMovements_ProductId",
                table: "StockMovement",
                newName: "IX_StockMovement_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_SalesItems_UserId",
                table: "SaleItem",
                newName: "IX_SaleItem_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_SalesItems_SaleId",
                table: "SaleItem",
                newName: "IX_SaleItem_SaleId");

            migrationBuilder.RenameIndex(
                name: "IX_SalesItems_ProductId",
                table: "SaleItem",
                newName: "IX_SaleItem_ProductId");

            migrationBuilder.AlterColumn<string>(
                name: "Reason",
                table: "StockMovement",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<int>(
                name: "PaymentMethod",
                table: "StockMovement",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Note",
                table: "StockMovement",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MovementType",
                table: "StockMovement",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<int>(
                name: "PaymentMethod",
                table: "Sale",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Customer",
                table: "Sale",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Sale",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddPrimaryKey(
                name: "PK_StockMovement",
                table: "StockMovement",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SaleItem",
                table: "SaleItem",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sale",
                table: "Sale",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_StockMovement_UserId",
                table: "StockMovement",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Sale_UserId",
                table: "Sale",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sale_Users_UserId",
                table: "Sale",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SaleItem_Products_ProductId",
                table: "SaleItem",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SaleItem_Sale_SaleId",
                table: "SaleItem",
                column: "SaleId",
                principalTable: "Sale",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SaleItem_Users_UserId",
                table: "SaleItem",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StockMovement_Products_ProductId",
                table: "StockMovement",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StockMovement_Users_UserId",
                table: "StockMovement",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
