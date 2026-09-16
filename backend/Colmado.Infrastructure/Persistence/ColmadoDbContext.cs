using Colmado.Domain.Entities;
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

        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ColmadoDbContext).Assembly);
        }
    }
}
