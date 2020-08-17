using ADS.Domain.Core;
using ADS.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ADS.Domain.Helpers
{
    public static class QueryParametersExtensions
    {

        public static bool Previous(this QueryParameters queryParameters)
        {
            return (queryParameters.Page > 1);
        }

        public static bool Next(this QueryParameters queryParameters, int totalCount)
        {
            return (queryParameters.Page < (int)GetTotalPages(queryParameters, totalCount));
        }

        public static double GetTotalPages(this QueryParameters queryParameters, int totalCount)
        {
            return Math.Ceiling(totalCount / (double)queryParameters.PageCount);
        }

        public static int GetSkipCountElement(this QueryParameters queryParameter, int page)
        {
            return queryParameter.PageCount * page;
        }

        public static bool HasSorName(this QueryParameters queryParameters)
        {
            return !String.IsNullOrEmpty(queryParameters.Active);
        }

        public static bool IsDescending(this QueryParameters queryParameters)
        {
            if (!String.IsNullOrEmpty(queryParameters.Direction))
            {
                return queryParameters.Direction.Split(' ').Last().ToLowerInvariant().StartsWith("desc");
            }
            return false;
        }

        public static PaginationViewModel GetPaginationViewModel<TEntity>(this IQueryable<TEntity> source, QueryParameters queryParameters)
        {
            var allItemCount = source.Count();
            var paginationMetadata = new PaginationViewModel
            {
                TotalCount = allItemCount,
                PageSize = queryParameters.PageCount,
                CurrentPage = queryParameters.Page,
                TotalPages = queryParameters.GetTotalPages(allItemCount)
            };
            if (queryParameters.Page > 1)
                paginationMetadata.Skip = queryParameters.GetSkipCountElement(paginationMetadata.CurrentPage - 1);

            return paginationMetadata;
        }
    }
}
