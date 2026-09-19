using Colmado.Application.Interfaces.Repositories;
using Colmado.Domain.Entities;
using Colmado.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Colmado.Infrastructure.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(ColmadoDbContext context) : base(context) { }

        public async Task<bool> ExistsNameAsync(string name, Guid userId, Guid? excludeId = null, CancellationToken ct = default)
            => await _dbSet.AnyAsync(c => c.UserId == userId && c.Name == name && (!excludeId.HasValue || c.Id != excludeId.Value), ct);

        public override async Task<IReadOnlyList<Category>> ListAsync(Guid userId, CancellationToken ct = default)
            => await _dbSet.Include(c => c.Products).Where(c => c.UserId == userId).ToListAsync(ct);
    }
}
