using Colmado.Application.Interfaces.Repositories;
using Colmado.Domain.Entities;
using Colmado.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Colmado.Infrastructure.Repositories
{
    public class StockMovementRepository : GenericRepository<StockMovement>, IStockMovementRepository
    {
        public StockMovementRepository(ColmadoDbContext context) : base(context) { }

        public async Task<IReadOnlyList<StockMovement>> ListByProductAsync(Guid productId, Guid userId, CancellationToken ct = default)
            => await _dbSet.Include(m => m.Product)
                .Where(m => m.UserId == userId && m.ProductId == productId)
                .OrderByDescending(m => m.Date).ToListAsync(ct);

        public async Task<IReadOnlyList<StockMovement>> ListByDateRangeAsync(Guid userId, DateTime? from, DateTime? to, CancellationToken ct = default)
        {
            var query = _dbSet.Include(m => m.Product).Where(m => m.UserId == userId);
            if (from.HasValue) query = query.Where(m => m.Date >= from.Value);
            if (to.HasValue) query = query.Where(m => m.Date <= to.Value);
            return await query.OrderByDescending(m => m.Date).ToListAsync(ct);
        }

        public override async Task<StockMovement?> GetByIdAsync(Guid id, Guid userId, CancellationToken ct = default)
            => await _dbSet.Include(m => m.Product).FirstOrDefaultAsync(m => m.Id == id && m.UserId == userId, ct);
    }
}
