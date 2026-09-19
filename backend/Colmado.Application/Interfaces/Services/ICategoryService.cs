using Colmado.Application.DTOs.Categories;

namespace Colmado.Application.Interfaces.Services
{
    public interface ICategoryService
    {
        Task<IReadOnlyList<CategoryResponseDto>> GetAllAsync(Guid userId, CancellationToken ct = default);
        Task<CategoryResponseDto> GetByIdAsync(Guid id, Guid userId, CancellationToken ct = default);
        Task<CategoryResponseDto> CreateAsync(CreateCategoryDto dto, Guid userId, CancellationToken ct = default);
        Task<CategoryResponseDto> UpdateAsync(Guid id, UpdateCategoryDto dto, Guid userId, CancellationToken ct = default);
        Task DeleteAsync(Guid id, Guid userId, CancellationToken ct = default);
    }
}
