using Colmado.Application.DTOs.Sales;

namespace Colmado.Application.Interfaces.Services
{
    public interface ISaleService
    {
        Task<IReadOnlyList<SaleResponseDto>> GetAllAsync(DateTime? from = null, DateTime? to = null, CancellationToken ct = default);
        Task<SaleResponseDto> GetByIdAsync(Guid id, CancellationToken ct = default);
        Task<SaleResponseDto> CreateAsync(CreateSaleDto dto, CancellationToken ct = default);
        Task CancelAsync(Guid id, CancellationToken ct = default);
    }
}
