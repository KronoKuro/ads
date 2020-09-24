using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ADS.Domain.ViewModels
{
    public class ManagmentCompanyViewModelsWithPaginationModel
    {
        public IQueryable<ManagmentCompanyViewModel> Companies { get; set; }
        public PaginationViewModel Pagination { get; set; }
    }
}
