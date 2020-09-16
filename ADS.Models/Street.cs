using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Models
{
    public class Street : EntityBase
    {
        public Street()
        {
            Houses = new List<House>();
        }
        
        public Guid CityId { get; set; }
        public virtual City City { get; set; }
        public virtual ICollection<House> Houses { get; set; }
    }
}
