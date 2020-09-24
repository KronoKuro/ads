using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Models.Map
{
    public class ManagmentCompanyMap : IEntityTypeConfiguration<ManagmentCompany>
    {
        public void Configure(EntityTypeBuilder<ManagmentCompany> builder)
        {
            builder.HasKey(x => x.Id);

            builder
                .HasOne(x => x.City)
                .WithMany(x => x.ManagmentCompanies)
                .HasForeignKey(x => x.CityId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
