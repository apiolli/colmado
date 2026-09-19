using Colmado.Domain.Enums;

namespace Colmado.Application.DTOs.StockMovements
{
    public record StockMovementResponseDto
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public MovementType MovementType { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public decimal Amount { get; set; }
        public string Reason { get; set; } = string.Empty;
        public string? Note { get; set; }
        public DateTime Date { get; set; }
    }
}
