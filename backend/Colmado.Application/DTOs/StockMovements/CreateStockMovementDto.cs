using Colmado.Domain.Enums;

namespace Colmado.Application.DTOs.StockMovements
{
    public record CreateStockMovementDto
    {
        public Guid ProductId { get; set; }
        public MovementType MovementType { get; set; }
        public decimal Amount { get; set; }
        public string Reason { get; set; } = string.Empty;
        public string? Note { get; set; }
    }
}
