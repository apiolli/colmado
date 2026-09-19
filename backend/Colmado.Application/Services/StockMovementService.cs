using AutoMapper;
using Colmado.Application.DTOs.StockMovements;
using Colmado.Application.Interfaces;
using Colmado.Application.Interfaces.Services;
using Colmado.Domain.Entities;
using Colmado.Domain.Enums;
using Colmado.Domain.Exceptions;

namespace Colmado.Application.Services
{
    public class StockMovementService : IStockMovementService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public StockMovementService(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<IReadOnlyList<StockMovementResponseDto>> GetAllAsync(Guid userId, DateTime? from = null, DateTime? to = null, CancellationToken ct = default)
        {
            var items = await _uow.StockMovements.ListByDateRangeAsync(userId, from, to, ct);
            return _mapper.Map<IReadOnlyList<StockMovementResponseDto>>(items);
        }

        public async Task<StockMovementResponseDto> GetByIdAsync(Guid id, Guid userId, CancellationToken ct = default)
        {
            var entity = await _uow.StockMovements.GetByIdAsync(id, userId, ct)
                ?? throw new NotFoundException("Movimiento no encontrado.");
            return _mapper.Map<StockMovementResponseDto>(entity);
        }

        public async Task<StockMovementResponseDto> CreateAsync(CreateStockMovementDto dto, Guid userId, CancellationToken ct = default)
        {
            await _uow.BeginTransactionAsync(ct);
            try
            {
                var product = await _uow.Products.GetByIdAsync(dto.ProductId, userId, ct)
                    ?? throw new BadRequestException("El producto no existe.");

                var quantity = (int)dto.Amount;
                if (quantity <= 0)
                    throw new BadRequestException("La cantidad debe ser mayor a cero.");

                if (dto.MovementType == MovementType.Entry)
                    product.Stock += quantity;
                else
                {
                    if (product.Stock < quantity)
                        throw new BadRequestException($"Stock insuficiente. Disponible: {product.Stock}.");
                    product.Stock -= quantity;
                }

                _uow.Products.Update(product);

                var entity = new StockMovement
                {
                    Id = Guid.NewGuid(),
                    ProductId = product.Id,
                    Product = product,
                    MovementType = dto.MovementType,
                    PaymentMethod = PaymentMethod.Cash,
                    Amount = dto.Amount,
                    Reason = dto.Reason,
                    Note = dto.Note,
                    Date = DateTime.UtcNow,
                    UserId = userId
                };

                await _uow.StockMovements.AddAsync(entity, ct);
                await _uow.SaveChangesAsync(ct);
                await _uow.CommitTransactionAsync(ct);

                return _mapper.Map<StockMovementResponseDto>(entity);
            }
            catch
            {
                await _uow.RollbackTransactionAsync(ct);
                throw;
            }
        }

        public async Task DeleteAsync(Guid id, Guid userId, CancellationToken ct = default)
        {
            await _uow.BeginTransactionAsync(ct);
            try
            {
                var entity = await _uow.StockMovements.GetByIdAsync(id, userId, ct)
                    ?? throw new NotFoundException("Movimiento no encontrado.");

                var product = await _uow.Products.GetByIdAsync(entity.ProductId, userId, ct);
                if (product is not null)
                {
                    var quantity = (int)entity.Amount;
                    if (entity.MovementType == MovementType.Entry)
                    {
                        if (product.Stock < quantity)
                            throw new BadRequestException("No se puede revertir el movimiento: stock insuficiente.");
                        product.Stock -= quantity;
                    }
                    else
                    {
                        product.Stock += quantity;
                    }
                    _uow.Products.Update(product);
                }

                _uow.StockMovements.Delete(entity);
                await _uow.SaveChangesAsync(ct);
                await _uow.CommitTransactionAsync(ct);
            }
            catch
            {
                await _uow.RollbackTransactionAsync(ct);
                throw;
            }
        }
    }
}
