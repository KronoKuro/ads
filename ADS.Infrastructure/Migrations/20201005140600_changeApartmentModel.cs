using Microsoft.EntityFrameworkCore.Migrations;

namespace ADS.Infrastructure.Migrations
{
    public partial class changeApartmentModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Apartments");

            migrationBuilder.AddColumn<int>(
                name: "Number",
                table: "Apartments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number",
                table: "Apartments");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Apartments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
