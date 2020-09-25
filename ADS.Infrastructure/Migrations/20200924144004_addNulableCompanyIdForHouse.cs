using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ADS.Infrastructure.Migrations
{
    public partial class addNulableCompanyIdForHouse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Houses_ManagmentCompanies_ManagmentCompanyId",
                table: "Houses");

            migrationBuilder.AlterColumn<Guid>(
                name: "ManagmentCompanyId",
                table: "Houses",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Houses_ManagmentCompanies_ManagmentCompanyId",
                table: "Houses",
                column: "ManagmentCompanyId",
                principalTable: "ManagmentCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Houses_ManagmentCompanies_ManagmentCompanyId",
                table: "Houses");

            migrationBuilder.AlterColumn<Guid>(
                name: "ManagmentCompanyId",
                table: "Houses",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Houses_ManagmentCompanies_ManagmentCompanyId",
                table: "Houses",
                column: "ManagmentCompanyId",
                principalTable: "ManagmentCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
