using Colmado.Domain.Enums;

namespace Colmado.Application.DTOs.Sales
{
    public class SaleResponseDto
    {
        public Guid Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Customer { get; set; } = string.Empty;
        public PaymentMethod PaymentMethod { get; set; }
        public decimal Subtotal { get; set; }
        public decimal? Discount { get; set; }
        public decimal Total { get; set; }
        public int TotalItems { get; set; }
        public DateTime Date { get; set; }
        public List<SaleItemDto> Items { get; set; } = [];
    }
}
