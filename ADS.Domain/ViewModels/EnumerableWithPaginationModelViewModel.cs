using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ADS.Domain.ViewModels
{
    public class EnumerableWithPaginationModelViewModel<T, E>
    {
        public T Entity { get; set; }
        public IQueryable<E> RelationEntities { get; set; }
        public PaginationViewModel Pagination { get; set; }
    }
}
