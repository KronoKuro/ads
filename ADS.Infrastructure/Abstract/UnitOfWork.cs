using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ADS.Infrastructure;

namespace ADS.Infrastructure.Abstract
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly ADCContext _context;

        public UnitOfWork(ADCContext context)
        {
            _context = context;
        }

        public IAbstractRepository<TEntity> GetRepository<TEntity>() where TEntity : class
        {
            return new AbstractRepository<TEntity>(_context);
        }

        public Task<int> SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }
    }
}
