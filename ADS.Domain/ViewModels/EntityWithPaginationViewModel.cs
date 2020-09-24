using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ADS.Domain.ViewModels
{
    public class EntityWithPaginationViewModel<T>
    {
        public IQueryable<T> Entities { get; set; }
        public PaginationViewModel Pagination { get; set; }
    }
}
