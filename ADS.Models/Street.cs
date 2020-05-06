using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Models
{
    public class Street : EntityBase
    {
        public ICollection<House> Houses { get; set; }
    }
}
