using Colmado.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Colmado.Infrastructure.Persistence.Configuration
{
    public class SaleItemConfiguration : IEntityTypeConfiguration<SaleItem>
    {
        public void Configure(EntityTypeBuilder<SaleItem> builder)
        {
            builder.Property(si => si.Quantity)
                .IsRequired();

            builder.Property(si => si.UnitPrice)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(si => si.Subtotal)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.HasOne(si => si.Sale)
                .WithMany(s => s.Items)
                .HasForeignKey(si => si.SaleId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(si => si.Product)
                .WithMany(p => p.Sales)
                .HasForeignKey(si => si.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(si => si.User)
                .WithMany(u => u.SalesItems)
                .HasForeignKey(si => si.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(si => si.SaleId);
            builder.HasIndex(si => si.ProductId);
        }
    }
}
