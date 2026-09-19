using AutoMapper;
using Colmado.Application.DTOs.Categories;
using Colmado.Domain.Interfaces;
using Colmado.Application.Interfaces.Auth;
using Colmado.Application.Interfaces.Services;
using Colmado.Domain.Entities;
using Colmado.Domain.Exceptions;

namespace Colmado.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork _uow;
        private readonly ICurrentUserService _currentUser;
        private readonly IMapper _mapper;

        public CategoryService(IUnitOfWork uow, ICurrentUserService currentUser, IMapper mapper)
        {
            _uow = uow;
            _currentUser = currentUser;
            _mapper = mapper;
        }

        public async Task<IReadOnlyList<CategoryResponseDto>> GetAllAsync(CancellationToken ct = default)
        {
            var items = await _uow.Categories.ListAsync(_currentUser.UserId, ct);
            return _mapper.Map<IReadOnlyList<CategoryResponseDto>>(items);
        }

        public async Task<CategoryResponseDto> GetByIdAsync(Guid id, CancellationToken ct = default)
        {
            var entity = await _uow.Categories.GetByIdAsync(id, _currentUser.UserId, ct)
                ?? throw new NotFoundException("Categoría no encontrada.");

            return _mapper.Map<CategoryResponseDto>(entity);
        }

        public async Task<CategoryResponseDto> CreateAsync(CreateCategoryDto dto, CancellationToken ct = default)
        {
            var userId = _currentUser.UserId;
            if (await _uow.Categories.ExistsNameAsync(dto.Name, userId, null, ct))
                throw new ConflictException("Ya existe una categoría con ese nombre.");

            var entity = _mapper.Map<Category>(dto);
            entity.Id = Guid.NewGuid();
            entity.UserId = userId;

            await _uow.Categories.AddAsync(entity, ct);
            await _uow.SaveChangesAsync(ct);
            return _mapper.Map<CategoryResponseDto>(entity);
        }

        public async Task<CategoryResponseDto> UpdateAsync(Guid id, UpdateCategoryDto dto, CancellationToken ct = default)
        {
            var userId = _currentUser.UserId;
            var entity = await _uow.Categories.GetByIdAsync(id, userId, ct)
                ?? throw new NotFoundException("Categoría no encontrada.");

            var categoryExists = await _uow.Categories.ExistsNameAsync(dto.Name, userId, id, ct);

            if (categoryExists)
                throw new ConflictException("Ya existe una categoría con ese nombre.");

            _mapper.Map(dto, entity);
            _uow.Categories.Update(entity);
            await _uow.SaveChangesAsync(ct);
            return _mapper.Map<CategoryResponseDto>(entity);
        }

        public async Task DeleteAsync(Guid id, CancellationToken ct = default)
        {
            var entity = await _uow.Categories.GetByIdAsync(id, _currentUser.UserId, ct)
                ?? throw new NotFoundException("Categoría no encontrada.");
                
            _uow.Categories.Delete(entity);
            await _uow.SaveChangesAsync(ct);
        }
    }
}
