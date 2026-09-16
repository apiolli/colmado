using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Colmado.Domain.Entities
{
    public class User
    {
            public Guid Id { get; set; }
            public string Name { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string PasswordHash { get; set; } = string.Empty;

            public string MarketName { get; set; } = string.Empty;
            public string? PhoneNumber { get; set; }     


            public List<Category> Categories { get; set; } = [];
            public List<Product> Products { get; set; } = [];
            public List<Sale> Sales { get; set; } = [];
            public List<StockMovement> StockMovements { get; set; } = [];
            public List<SaleItem> SalesItems { get; set; } = [];
            
  
    }
}