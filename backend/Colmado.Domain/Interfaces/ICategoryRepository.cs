using Colmado.Domain.Entities;

namespace Colmado.Domain.Interfaces
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        Task<bool> ExistsNameAsync(string name, Guid userId, Guid? excludeId = null, CancellationToken ct = default);
    }
}
