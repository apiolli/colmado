using Colmado.Application.DTOs.Products;

namespace Colmado.Application.Interfaces.Services
{
    public interface IProductService
    {
        Task<IReadOnlyList<ProductResponseDto>> GetAllAsync(Guid userId, CancellationToken ct = default);
        Task<IReadOnlyList<ProductResponseDto>> GetLowStockAsync(Guid userId, CancellationToken ct = default);
        Task<ProductResponseDto> GetByIdAsync(Guid id, Guid userId, CancellationToken ct = default);
        Task<ProductResponseDto> CreateAsync(CreateProductDto dto, Guid userId, CancellationToken ct = default);
        Task<ProductResponseDto> UpdateAsync(Guid id, UpdateProductDto dto, Guid userId, CancellationToken ct = default);
        Task DeleteAsync(Guid id, Guid userId, CancellationToken ct = default);
    }
}
