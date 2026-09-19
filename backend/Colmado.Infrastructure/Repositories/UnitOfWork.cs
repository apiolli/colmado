using Colmado.Application.Interfaces;
using Colmado.Application.Interfaces.Repositories;
using Colmado.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore.Storage;

namespace Colmado.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ColmadoDbContext _context;
        private IDbContextTransaction? _transaction;

        public ICategoryRepository Categories { get; }
        public IProductRepository Products { get; }
        public ISaleRepository Sales { get; }
        public IStockMovementRepository StockMovements { get; }
        public IUserRepository Users { get; }

        public UnitOfWork(
            ColmadoDbContext context,
            ICategoryRepository categories,
            IProductRepository products,
            ISaleRepository sales,
            IStockMovementRepository stockMovements,
            IUserRepository users)
        {
            _context = context;
            Categories = categories;
            Products = products;
            Sales = sales;
            StockMovements = stockMovements;
            Users = users;
        }

        public Task<int> SaveChangesAsync(CancellationToken ct = default)
            => _context.SaveChangesAsync(ct);

        public async Task BeginTransactionAsync(CancellationToken ct = default)
        {
            _transaction ??= await _context.Database.BeginTransactionAsync(ct);
        }

        public async Task CommitTransactionAsync(CancellationToken ct = default)
        {
            if (_transaction is not null)
            {
                await _transaction.CommitAsync(ct);
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public async Task RollbackTransactionAsync(CancellationToken ct = default)
        {
            if (_transaction is not null)
            {
                await _transaction.RollbackAsync(ct);
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public void Dispose()
        {
            _transaction?.Dispose();
            _context.Dispose();
        }
    }
}
