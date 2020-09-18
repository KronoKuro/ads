using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ADS.Infrastructure.Abstract
{
    public interface IAbstractRepository<TEntity>
        where TEntity : class
    {
        void Add(TEntity entity);
        void AddRange(IEnumerable<TEntity> entities);

        void Update(TEntity entity);
        void UpdateRange(IEnumerable<TEntity> entities);

        void Remove(TEntity entity);
        void RemoveRange(IEnumerable<TEntity> entities);

        int Count();
        Task<int> CountAsync();

        int Count(Expression<Func<TEntity, bool>> predicate);
        Task<int> CountAsync(Expression<Func<TEntity, bool>> predicate);

        IQueryable<TEntity> GetQuery();

        TEntity GetSingleOrDefault(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> GetSingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);

        TEntity Find(Guid id);
        ValueTask<TEntity> FindAsync(Guid id);
    }
}
