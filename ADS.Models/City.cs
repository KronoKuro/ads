using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Models
{
    public class City : EntityBase
    {
        public City()
        {
            Id = new Guid();
            Streets = new List<Street>();
            ManagmentCompanies = new List<ManagmentCompany>();
        }

        public virtual ICollection<Street> Streets { get; set; } 
        public virtual ICollection<ManagmentCompany> ManagmentCompanies { get; set; }
    }
}
