using Colmado.Application.DTOs.Products;

namespace Colmado.Application.Interfaces.Services
{
    public interface IProductService
    {
        Task<IReadOnlyList<ProductResponseDto>> GetAllAsync(CancellationToken ct = default);
        Task<IReadOnlyList<ProductResponseDto>> GetLowStockAsync(CancellationToken ct = default);
        Task<ProductResponseDto> GetByIdAsync(Guid id, CancellationToken ct = default);
        Task<ProductResponseDto> CreateAsync(CreateProductDto dto, CancellationToken ct = default);
        Task<ProductResponseDto> UpdateAsync(Guid id, UpdateProductDto dto, CancellationToken ct = default);
        Task DeleteAsync(Guid id, CancellationToken ct = default);
    }
}
