using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Models
{
    public class ManagmentCompany : EntityBase
    {
        public string Description { get; set; }

        public Guid CityId { get; set; }
        public virtual City City { get; set; }

        public ICollection<House> Houses { get; set; }
    }
}
