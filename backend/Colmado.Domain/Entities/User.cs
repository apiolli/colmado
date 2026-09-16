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
            
    }
}