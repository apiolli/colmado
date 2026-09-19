using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Colmado.Domain.Enums;

namespace Colmado.Domain.Entities
{
    public class StockMovement
    {
        public Guid Id { get; set; }
        public Product? Product { get; set; }
        public Guid ProductId { get; set; }
        public PaymentMethod PaymentMethod {get; set;}
        public MovementType MovementType { get; set; }
        public decimal Amount { get; set; }
        public string Reason { get; set; } = string.Empty;
        public string? Note { get; set; }
        public DateTime Date { get; set; }
        public User? User { get; set; }
        public Guid UserId { get; set; }  
        
    }
}