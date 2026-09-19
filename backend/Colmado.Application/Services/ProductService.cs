using AutoMapper;
using Colmado.Application.DTOs.Products;
using Colmado.Domain.Interfaces;
using Colmado.Application.Interfaces.Auth;
using Colmado.Application.Interfaces.Services;
using Colmado.Domain.Entities;
using Colmado.Domain.Exceptions;

namespace Colmado.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _uow;
        private readonly ICurrentUserService _currentUser;
        private readonly IMapper _mapper;

        public ProductService(IUnitOfWork uow, ICurrentUserService currentUser, IMapper mapper)
        {
            _uow = uow;
            _currentUser = currentUser;
            _mapper = mapper;
        }

        public async Task<IReadOnlyList<ProductResponseDto>> GetAllAsync(CancellationToken ct = default)
        {
            var items = await _uow.Products.ListWithCategoryAsync(_currentUser.UserId, ct);
            return _mapper.Map<IReadOnlyList<ProductResponseDto>>(items);
        }

        public async Task<IReadOnlyList<ProductResponseDto>> GetLowStockAsync(CancellationToken ct = default)
        {
            var items = await _uow.Products.GetLowStockAsync(_currentUser.UserId, ct);
            return _mapper.Map<IReadOnlyList<ProductResponseDto>>(items);
        }

        public async Task<ProductResponseDto> GetByIdAsync(Guid id, CancellationToken ct = default)
        {
            var entity = await _uow.Products.GetByIdWithCategoryAsync(id, _currentUser.UserId, ct)
                ?? throw new NotFoundException("Producto no encontrado.");
                
            return _mapper.Map<ProductResponseDto>(entity);
        }

        public async Task<ProductResponseDto> CreateAsync(CreateProductDto dto, CancellationToken ct = default)
        {
            var userId = _currentUser.UserId;
            if (await _uow.Products.ExistsSkuAsync(dto.SKU, userId, null, ct))
                throw new ConflictException("Ya existe un producto con ese SKU.");

            var category = await _uow.Categories.GetByIdAsync(dto.CategoryId, userId, ct)
                ?? throw new BadRequestException("La categoría no existe.");

            var entity = _mapper.Map<Product>(dto);
            entity.Id = Guid.NewGuid();
            entity.UserId = userId;

            await _uow.Products.AddAsync(entity, ct);
            await _uow.SaveChangesAsync(ct);

            entity.Category = category;
            return _mapper.Map<ProductResponseDto>(entity);
        }

        public async Task<ProductResponseDto> UpdateAsync(Guid id, UpdateProductDto dto, CancellationToken ct = default)
        {
            var userId = _currentUser.UserId;
            var entity = await _uow.Products.GetByIdAsync(id, userId, ct)
                ?? throw new NotFoundException("Producto no encontrado.");

            if (await _uow.Products.ExistsSkuAsync(dto.SKU, userId, id, ct))
                throw new ConflictException("Ya existe un producto con ese SKU.");

            var category = await _uow.Categories.GetByIdAsync(dto.CategoryId, userId, ct)
                ?? throw new BadRequestException("La categoría no existe.");

            _mapper.Map(dto, entity);
            _uow.Products.Update(entity);
            await _uow.SaveChangesAsync(ct);

            entity.Category = category;
            return _mapper.Map<ProductResponseDto>(entity);
        }

        public async Task DeleteAsync(Guid id, CancellationToken ct = default)
        {
            var entity = await _uow.Products.GetByIdAsync(id, _currentUser.UserId, ct)
                ?? throw new NotFoundException("Producto no encontrado.");

            _uow.Products.Delete(entity);
            await _uow.SaveChangesAsync(ct);
        }
    }
}
