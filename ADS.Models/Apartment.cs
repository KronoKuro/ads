using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Models
{
    public class Apartment : EntityBase
    {
        public Guid HouseId { get; set; }
        public virtual House House { get; set; }

        public ICollection<Appeal> Appeals { get; set; }
    }
}
