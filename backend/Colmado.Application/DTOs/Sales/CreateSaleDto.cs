using Colmado.Domain.Enums;

namespace Colmado.Application.DTOs.Sales
{
    public class CreateSaleDto
    {
        public string Customer { get; set; } = string.Empty;
        public PaymentMethod PaymentMethod { get; set; }
        public decimal? Discount { get; set; }
        public List<CreateSaleItemDto> Items { get; set; } = [];
    }
}
