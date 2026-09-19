using AutoMapper;
using Colmado.Application.DTOs.Sales;
using Colmado.Domain.Interfaces;
using Colmado.Application.Interfaces.Auth;
using Colmado.Application.Interfaces.Services;
using Colmado.Domain.Entities;
using Colmado.Domain.Enums;
using Colmado.Domain.Exceptions;

namespace Colmado.Application.Services
{
    public class SaleService : ISaleService
    {
        private readonly IUnitOfWork _uow;
        private readonly ICurrentUserService _currentUser;
        private readonly IMapper _mapper;

        public SaleService(IUnitOfWork uow, ICurrentUserService currentUser, IMapper mapper)
        {
            _uow = uow;
            _currentUser = currentUser;
            _mapper = mapper;
        }

        public async Task<IReadOnlyList<SaleResponseDto>> GetAllAsync(DateTime? from = null, DateTime? to = null, CancellationToken ct = default)
        {
            var items = await _uow.Sales.ListByDateRangeAsync(_currentUser.UserId, from, to, ct);
            return _mapper.Map<IReadOnlyList<SaleResponseDto>>(items);
        }

        public async Task<SaleResponseDto> GetByIdAsync(Guid id, CancellationToken ct = default)
        {
            var entity = await _uow.Sales.GetWithItemsAsync(id, _currentUser.UserId, ct)
                ?? throw new NotFoundException("Venta no encontrada.");
            return _mapper.Map<SaleResponseDto>(entity);
        }

        public async Task<SaleResponseDto> CreateAsync(CreateSaleDto dto, CancellationToken ct = default)
        {
            if (dto.Items.Count == 0)
                throw new BadRequestException("La venta debe tener al menos un producto.");

            var userId = _currentUser.UserId;
            await _uow.BeginTransactionAsync(ct);
            try
            {
                var productIds = dto.Items.Select(i => i.ProductId).Distinct().ToList();
                var products = await _uow.Products.FindAsync(p => p.UserId == userId && productIds.Contains(p.Id), ct);
                var byId = products.ToDictionary(p => p.Id);

                decimal subtotal = 0;
                var saleItems = new List<SaleItem>();

                foreach (var line in dto.Items)
                {
                    if (!byId.TryGetValue(line.ProductId, out var product))
                        throw new BadRequestException($"Producto no encontrado: {line.ProductId}.");

                    if (product.Stock < line.Quantity)
                        throw new BadRequestException($"Stock insuficiente para '{product.Name}'. Disponible: {product.Stock}.");

                    var lineSubtotal = product.UnitPrice * line.Quantity;
                    subtotal += lineSubtotal;

                    product.Stock -= line.Quantity;
                    _uow.Products.Update(product);

                    saleItems.Add(new SaleItem
                    {
                        Id = Guid.NewGuid(),
                        ProductId = product.Id,
                        Product = product,
                        Quantity = line.Quantity,
                        UnitPrice = product.UnitPrice,
                        Subtotal = lineSubtotal,
                        UserId = userId
                    });
                }

                var discount = dto.Discount ?? 0;
                if (discount < 0 || discount > subtotal)
                    throw new BadRequestException("Descuento inválido.");

                var sale = new Sale
                {
                    Id = Guid.NewGuid(),
                    Customer = dto.Customer,
                    PaymentMethod = dto.PaymentMethod,
                    Subtotal = subtotal,
                    Discount = discount == 0 ? null : discount,
                    Total = subtotal - discount,
                    Code = $"V-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString("N")[..6].ToUpper()}",
                    Date = DateTime.UtcNow,
                    TotalItems = dto.Items.Sum(i => i.Quantity),
                    UserId = userId,
                    Items = saleItems
                };
                foreach (var si in saleItems)
                {
                    si.SaleId = sale.Id;
                    si.Sale = sale;
                }

                await _uow.Sales.AddAsync(sale, ct);

                foreach (var si in saleItems)
                {
                    await _uow.StockMovements.AddAsync(new StockMovement
                    {
                        Id = Guid.NewGuid(),
                        ProductId = si.ProductId,
                        PaymentMethod = dto.PaymentMethod,
                        MovementType = MovementType.Outflow,
                        Amount = si.Quantity,
                        Reason = $"Venta {sale.Code}",
                        Date = DateTime.UtcNow,
                        UserId = userId
                    }, ct);
                }

                await _uow.SaveChangesAsync(ct);
                await _uow.CommitTransactionAsync(ct);

                var created = await _uow.Sales.GetWithItemsAsync(sale.Id, userId, ct);
                return _mapper.Map<SaleResponseDto>(created!);
            }
            catch
            {
                await _uow.RollbackTransactionAsync(ct);
                throw;
            }
        }

        public async Task CancelAsync(Guid id, CancellationToken ct = default)
        {
            var userId = _currentUser.UserId;
            await _uow.BeginTransactionAsync(ct);
            try
            {
                var sale = await _uow.Sales.GetWithItemsAsync(id, userId, ct)
                    ?? throw new NotFoundException("Venta no encontrada.");

                foreach (var item in sale.Items)
                {
                    var product = await _uow.Products.GetByIdAsync(item.ProductId, userId, ct);
                    if (product is not null)
                    {
                        product.Stock += item.Quantity;
                        _uow.Products.Update(product);
                    }
                }

                _uow.Sales.Delete(sale);
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
