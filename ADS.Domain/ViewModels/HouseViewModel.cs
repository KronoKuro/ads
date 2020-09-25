using ADS.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Domain.ViewModels
{
    public class HouseViewModel : EntityBase
    {
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
        public Guid? ManagmentCompanyId { get; set; }
        public string ManagmentCompanyName { get; set; }
        public Guid StreetId { get; set; }
    }
}
