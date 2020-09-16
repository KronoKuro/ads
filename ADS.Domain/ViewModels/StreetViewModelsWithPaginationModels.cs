using ADS.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ADS.Domain.ViewModels
{
    public class StreetViewModelsWithPaginationModels
    {
        public CityViewModel City { get; set; }
        public IQueryable<StreetViewModel> Streets { get; set; }
        public PaginationViewModel Pagination { get; set; }
    }
}
