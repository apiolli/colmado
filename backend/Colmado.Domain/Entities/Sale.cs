using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Colmado.Domain.Enums;

namespace Colmado.Domain.Entities
{
    public class Sale
    {
        public Guid Id { get; set; }
        public List<SaleItem> Items { get; set; } = [];
        public string Customer { get; set; } = string.Empty;
        public PaymentMethod PaymentMethod { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Total { get; set; }
        public decimal? Discount { get; set; }

        public string Code { get; set; } = string.Empty;
        public DateTime Date { get; set; } 
        public int TotalItems { get; set; }

        public User? User { get; set; }
        public Guid UserId { get; set; }
        
        
        
    }
}