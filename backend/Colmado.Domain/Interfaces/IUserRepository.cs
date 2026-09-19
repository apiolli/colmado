using Colmado.Domain.Entities;

namespace Colmado.Domain.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetByEmailAsync(string email, CancellationToken ct = default);
        Task<bool> ExistsEmailAsync(string email, CancellationToken ct = default);
    }
}
