using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Colmado.Domain.Entities
{
    public class SaleItem
    {
        public Guid Id { get; set; }
        public Guid SaleId { get; set; }
        public Sale? Sale { get; set; }

        public Guid ProductId { get; set; }
        public Product? Product { get; set; }

        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Subtotal { get; set; }

        public User? User { get; set; }
        public Guid UserId { get; set; }
    }
}