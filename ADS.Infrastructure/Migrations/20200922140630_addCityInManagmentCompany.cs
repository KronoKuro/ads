using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ADS.Infrastructure.Migrations
{
    public partial class addCityInManagmentCompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CityId",
                table: "ManagmentCompanies",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ManagmentCompanies_CityId",
                table: "ManagmentCompanies",
                column: "CityId");

            migrationBuilder.AddForeignKey(
                name: "FK_ManagmentCompanies_Cities_CityId",
                table: "ManagmentCompanies",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ManagmentCompanies_Cities_CityId",
                table: "ManagmentCompanies");

            migrationBuilder.DropIndex(
                name: "IX_ManagmentCompanies_CityId",
                table: "ManagmentCompanies");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "ManagmentCompanies");
        }
    }
}
