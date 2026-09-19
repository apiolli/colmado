using Colmado.Application.DTOs.StockMovements;

namespace Colmado.Application.Interfaces.Services
{
    public interface IStockMovementService
    {
        Task<IReadOnlyList<StockMovementResponseDto>> GetAllAsync(DateTime? from = null, DateTime? to = null, CancellationToken ct = default);
        Task<StockMovementResponseDto> GetByIdAsync(Guid id, CancellationToken ct = default);
        Task<StockMovementResponseDto> CreateAsync(CreateStockMovementDto dto, CancellationToken ct = default);
        Task DeleteAsync(Guid id, CancellationToken ct = default);
    }
}
