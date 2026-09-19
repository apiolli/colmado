using Colmado.Domain.Enums;

namespace Colmado.Application.DTOs.Sales
{
    public record CreateSaleItemDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
