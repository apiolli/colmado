using Colmado.Domain.Entities;

namespace Colmado.Application.Interfaces.Repositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetByEmailAsync(string email, CancellationToken ct = default);
        Task<bool> ExistsEmailAsync(string email, CancellationToken ct = default);
    }
}
