using ADS.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Domain.ViewModels
{
    public class HouseViewModel : EntityBase
    {
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public Guid? ManagmentCompanyId { get; set; }
        public string ManagmentCompanyName { get; set; }
        public Guid StreetId { get; set; }
    }
}
