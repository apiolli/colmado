using Colmado.Domain.Entities;

namespace Colmado.Application.Interfaces.Repositories
{
    public interface ISaleRepository : IGenericRepository<Sale>
    {
        Task<Sale?> GetWithItemsAsync(Guid id, Guid userId, CancellationToken ct = default);
        Task<IReadOnlyList<Sale>> ListByDateRangeAsync(Guid userId, DateTime? from, DateTime? to, CancellationToken ct = default);
    }
}
