using ADS.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Infrastructure
{
    public class ADCContext : IdentityDbContext<User, Role, Guid>
    {
        public ADCContext(DbContextOptions<ADCContext> options)
            : base(options)
        {
            //   Database.EnsureCreated();   // создаем базу данных при первом обращении
        }

        public DbSet<Notification> Notifications { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Appeal> Appeals { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<ManagmentCompany> ManagmentCompanies { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Street> Streets { get; set; }
        public DbSet<House> Houses { get; set; }
        public DbSet<Apartment> Apartments { get; set; }
    }
}
