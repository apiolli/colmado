using Colmado.Domain.Entities;

namespace Colmado.Application.Interfaces.Repositories
{
    public interface IStockMovementRepository : IGenericRepository<StockMovement>
    {
        Task<IReadOnlyList<StockMovement>> ListByProductAsync(Guid productId, Guid userId, CancellationToken ct = default);
        Task<IReadOnlyList<StockMovement>> ListByDateRangeAsync(Guid userId, DateTime? from, DateTime? to, CancellationToken ct = default);
    }
}
