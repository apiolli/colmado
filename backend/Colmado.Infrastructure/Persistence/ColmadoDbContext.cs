using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Colmado.Infrastructure.Persistence
{
    public class ColmadoDbContext : DbContext
    {
        public ColmadoDbContext(DbContextOptions<ColmadoDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
