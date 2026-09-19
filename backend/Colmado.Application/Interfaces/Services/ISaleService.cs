using Colmado.Application.DTOs.Sales;

namespace Colmado.Application.Interfaces.Services
{
    public interface ISaleService
    {
        Task<IReadOnlyList<SaleResponseDto>> GetAllAsync(Guid userId, DateTime? from = null, DateTime? to = null, CancellationToken ct = default);
        Task<SaleResponseDto> GetByIdAsync(Guid id, Guid userId, CancellationToken ct = default);
        Task<SaleResponseDto> CreateAsync(CreateSaleDto dto, Guid userId, CancellationToken ct = default);
        Task CancelAsync(Guid id, Guid userId, CancellationToken ct = default);
    }
}
