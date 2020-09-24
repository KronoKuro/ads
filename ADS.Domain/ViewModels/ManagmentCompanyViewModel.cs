using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ADS.Domain.ViewModels
{
    public class ManagmentCompanyViewModel
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public Guid CityId { get; set; }
        public string CityName { get; set; }

    }
}
