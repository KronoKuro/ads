using ADS.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ADS.Domain.ViewModels
{
    public class CityViewModelsWithPaginationModels
    {
        public IQueryable<CityViewModel> cities { get; set; }
        public PaginationViewModel pagination { get; set; }
    }
}
