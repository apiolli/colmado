using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Colmado.Domain.Entities
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string SKU { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
        public int Stock { get; set; } 
        public int MinimunStock { get; set; }
        public string? Description { get; set; }
        public Category? Category { get; set; }
        public Guid CategoryId { get; set; } 
        public User? User { get; set; }
        public Guid UserId { get; set; }
        public List<SaleItem> Sales { get; set; } = [];
           
    }
}