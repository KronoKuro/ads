using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ADS.Infrastructure.Abstract
{
    public interface IUnitOfWork
    {
        IAbstractRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
        Task<int> SaveChangesAsync();
    }
}
