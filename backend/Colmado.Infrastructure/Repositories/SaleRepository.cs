using Colmado.Application.Interfaces.Repositories;
using Colmado.Domain.Entities;
using Colmado.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Colmado.Infrastructure.Persistence.Repositories
{
    public class SaleRepository : GenericRepository<Sale>, ISaleRepository
    {
        public SaleRepository(ColmadoDbContext context) : base(context) { }

        public async Task<Sale?> GetWithItemsAsync(Guid id, Guid userId, CancellationToken ct = default)
            => await _dbSet.Include(s => s.Items).ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId, ct);

        public async Task<IReadOnlyList<Sale>> ListByDateRangeAsync(Guid userId, DateTime? from, DateTime? to, CancellationToken ct = default)
        {
            var query = _dbSet.Include(s => s.Items).ThenInclude(i => i.Product)
                .Where(s => s.UserId == userId);
            if (from.HasValue) query = query.Where(s => s.Date >= from.Value);
            if (to.HasValue) query = query.Where(s => s.Date <= to.Value);
            return await query.OrderByDescending(s => s.Date).ToListAsync(ct);
        }
    }
}
