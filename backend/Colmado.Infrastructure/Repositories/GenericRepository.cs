using Colmado.Application.Interfaces.Repositories;
using Colmado.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Colmado.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly ColmadoDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public GenericRepository(ColmadoDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public virtual async Task<T?> GetByIdAsync(Guid id, Guid userId, CancellationToken ct = default)
        {
            var entity = await _dbSet.FindAsync(new { id }, ct);

            if (entity is null) return null;

            var prop = typeof(T).GetProperty("UserId");

            if (prop is not null && prop.GetValue(entity) is Guid owner && owner != userId)
                return null;

            return entity;
        }

        public virtual async Task<IReadOnlyList<T>> ListAsync(Guid userId, CancellationToken ct = default)
        {
            var prop = typeof(T).GetProperty("UserId");

            if (prop is null) return await _dbSet.ToListAsync(ct);

            return await _dbSet.Where(e => EF.Property<Guid>(e, "UserId") == userId).ToListAsync(ct);
        }

        public async Task<IReadOnlyList<T>> FindAsync(Expression<Func<T, bool>> predicate, CancellationToken ct = default)
            => await _dbSet.Where(predicate).ToListAsync(ct);

        public async Task AddAsync(T entity, CancellationToken ct = default)
            => await _dbSet.AddAsync(entity, ct);

        public void Update(T entity) => _dbSet.Update(entity);
        public void Delete(T entity) => _dbSet.Remove(entity);
    }
}
