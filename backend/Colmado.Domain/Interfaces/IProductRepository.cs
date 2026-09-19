using Colmado.Domain.Entities;

namespace Colmado.Domain.Interfaces
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<Product?> GetBySkuAsync(string sku, Guid userId, CancellationToken ct = default);
        Task<bool> ExistsSkuAsync(string sku, Guid userId, Guid? excludeId = null, CancellationToken ct = default);
        Task<IReadOnlyList<Product>> GetLowStockAsync(Guid userId, CancellationToken ct = default);
        Task<IReadOnlyList<Product>> ListWithCategoryAsync(Guid userId, CancellationToken ct = default);
        Task<Product?> GetByIdWithCategoryAsync(Guid id, Guid userId, CancellationToken ct = default);
    }
}
