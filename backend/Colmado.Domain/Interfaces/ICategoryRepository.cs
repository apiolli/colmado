using Colmado.Domain.Entities;

namespace Colmado.Application.Interfaces.Repositories
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        Task<bool> ExistsNameAsync(string name, Guid userId, Guid? excludeId = null, CancellationToken ct = default);
    }
}
