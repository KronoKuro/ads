using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ADS.Infrastructure.Migrations
{
    public partial class addApealwithApartment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Houses_ManagmentCompany_ManagmentCompanyId",
                table: "Houses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ManagmentCompany",
                table: "ManagmentCompany");

            migrationBuilder.RenameTable(
                name: "ManagmentCompany",
                newName: "ManagmentCompanies");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ManagmentCompanies",
                table: "ManagmentCompanies",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Appeals",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    DateStart = table.Column<DateTime>(nullable: false),
                    DateEnd = table.Column<DateTime>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    ApparmentId = table.Column<Guid>(nullable: false),
                    ApartmentId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appeals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Appeals_Apartments_ApartmentId",
                        column: x => x.ApartmentId,
                        principalTable: "Apartments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appeals_ApartmentId",
                table: "Appeals",
                column: "ApartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Houses_ManagmentCompanies_ManagmentCompanyId",
                table: "Houses",
                column: "ManagmentCompanyId",
                principalTable: "ManagmentCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Houses_ManagmentCompanies_ManagmentCompanyId",
                table: "Houses");

            migrationBuilder.DropTable(
                name: "Appeals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ManagmentCompanies",
                table: "ManagmentCompanies");

            migrationBuilder.RenameTable(
                name: "ManagmentCompanies",
                newName: "ManagmentCompany");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ManagmentCompany",
                table: "ManagmentCompany",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Houses_ManagmentCompany_ManagmentCompanyId",
                table: "Houses",
                column: "ManagmentCompanyId",
                principalTable: "ManagmentCompany",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
