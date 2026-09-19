using Colmado.Domain.Interfaces;
using Colmado.Domain.Entities;
using Colmado.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Colmado.Infrastructure.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(ColmadoDbContext context) : base(context) { }

        public async Task<User?> GetByEmailAsync(string email, CancellationToken ct = default)
            => await _dbSet.FirstOrDefaultAsync(u => u.Email == email, ct);

        public async Task<bool> ExistsEmailAsync(string email, CancellationToken ct = default)
            => await _dbSet.AnyAsync(u => u.Email == email, ct);
    }
}
