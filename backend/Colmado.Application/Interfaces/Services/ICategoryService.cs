using Colmado.Application.DTOs.Categories;

namespace Colmado.Application.Interfaces.Services
{
    public interface ICategoryService
    {
        Task<IReadOnlyList<CategoryResponseDto>> GetAllAsync(CancellationToken ct = default);
        Task<CategoryResponseDto> GetByIdAsync(Guid id, CancellationToken ct = default);
        Task<CategoryResponseDto> CreateAsync(CreateCategoryDto dto, CancellationToken ct = default);
        Task<CategoryResponseDto> UpdateAsync(Guid id, UpdateCategoryDto dto, CancellationToken ct = default);
        Task DeleteAsync(Guid id, CancellationToken ct = default);
    }
}
