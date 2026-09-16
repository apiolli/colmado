using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Colmado.Domain.Entities
{
    public class Category
    {
        public Guid Id {get; set;}
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public string Icon {get; set; } = string.Empty;
        public List<Product> Products { get; set; } = [];

        public Guid UserId { get; set; }
        public User? User { get; set; }    
        
    }
}