using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace ADS.Infrastructure.Extensions
{
    public static class QueryExtensions
    {
        const string Ask = "asc";
        const string Desc = "desc";
        public static IQueryable<TEntity> QueryOrderBy<TEntity>(this IQueryable<TEntity> source, string orderByProperty,
                          bool desc)
        {
            var orderByPropertyFirstUpper = System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(orderByProperty.ToLower());
            string command = desc ? "OrderByDescending" : "OrderBy";
            var type = typeof(TEntity);
            var property = type.GetProperty(orderByPropertyFirstUpper);
            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);
            var resultExpression = Expression.Call(typeof(Queryable), command, new Type[] { type, property.PropertyType },
                                          source.Expression, Expression.Quote(orderByExpression));
            return source.Provider.CreateQuery<TEntity>(resultExpression);
        }

        public static IQueryable<TEntity> Sort<TEntity>(this IQueryable<TEntity> source, string active, string direction)
        {
            if (direction == Ask)
                return source.QueryOrderBy(active, true);
            if (direction == Desc)
                return source.QueryOrderBy(active, false);

            return source;
        }

    }
}
