using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ADS.Models
{
    public class Apartment
    {
        public Guid Id { get; set; }

        public int Number { get; set; }

        public Guid HouseId { get; set; }
        public virtual House House { get; set; }

        public ICollection<Appeal> Appeals { get; set; }
    }
}
