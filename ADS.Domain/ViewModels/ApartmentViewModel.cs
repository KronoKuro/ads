using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Domain.ViewModels
{
    public class ApartmentViewModel
    {
        public Guid Id { get; set; }

        public int? Number { get; set; }

        public Guid HouseId { get; set; }
        public virtual HouseViewModel House { get; set; }
    }
}
