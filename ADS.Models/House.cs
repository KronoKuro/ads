using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Models
{
    public class House : EntityBase
    {
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public Guid? ManagmentCompanyId { get; set; }
        public virtual ManagmentCompany ManagmentCompany { get; set; }
        public Guid StreetId { get; set; }
        public virtual Street Street { get; set; }
        public virtual ICollection<Apartment> Apartments { get; set; }
    }
}
