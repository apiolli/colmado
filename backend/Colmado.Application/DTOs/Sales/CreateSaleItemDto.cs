using Colmado.Domain.Enums;

namespace Colmado.Application.DTOs.Sales
{
    public class CreateSaleItemDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
