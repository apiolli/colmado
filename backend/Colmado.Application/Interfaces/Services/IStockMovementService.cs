using Colmado.Application.DTOs.StockMovements;

namespace Colmado.Application.Interfaces.Services
{
    public interface IStockMovementService
    {
        Task<IReadOnlyList<StockMovementResponseDto>> GetAllAsync(Guid userId, DateTime? from = null, DateTime? to = null, CancellationToken ct = default);
        Task<StockMovementResponseDto> GetByIdAsync(Guid id, Guid userId, CancellationToken ct = default);
        Task<StockMovementResponseDto> CreateAsync(CreateStockMovementDto dto, Guid userId, CancellationToken ct = default);
        Task DeleteAsync(Guid id, Guid userId, CancellationToken ct = default);
    }
}
