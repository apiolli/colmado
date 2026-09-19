using Colmado.Domain.Interfaces;
using Colmado.Domain.Entities;
using Colmado.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Colmado.Infrastructure.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(ColmadoDbContext context) : base(context) { }

        public async Task<Product?> GetBySkuAsync(string sku, Guid userId, CancellationToken ct = default)
            => await _dbSet.Include(p => p.Category).FirstOrDefaultAsync(p => p.UserId == userId && p.SKU == sku, ct);

        public async Task<bool> ExistsSkuAsync(string sku, Guid userId, Guid? excludeId = null, CancellationToken ct = default)
            => await _dbSet.AnyAsync(p => p.UserId == userId && p.SKU == sku && (!excludeId.HasValue || p.Id != excludeId.Value), ct);

        public async Task<IReadOnlyList<Product>> GetLowStockAsync(Guid userId, CancellationToken ct = default)
            => await _dbSet.Include(p => p.Category).Where(p => p.UserId == userId && p.Stock <= p.MinimunStock).ToListAsync(ct);

        public async Task<IReadOnlyList<Product>> ListWithCategoryAsync(Guid userId, CancellationToken ct = default)
            => await _dbSet.Include(p => p.Category).Where(p => p.UserId == userId).ToListAsync(ct);

        public async Task<Product?> GetByIdWithCategoryAsync(Guid id, Guid userId, CancellationToken ct = default)
            => await _dbSet.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId, ct);
    }
}
