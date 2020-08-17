using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Domain.ViewModels
{
    public class PaginationViewModel
    {   
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int TotalCount { get; set; }
        public double TotalPages { get; set; }
        public int Skip { get; set; } = 0;
    }
}
