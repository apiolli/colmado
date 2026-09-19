using Colmado.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Colmado.Infrastructure.Persistence.Configuration
{
    public class SalesConfiguration : IEntityTypeConfiguration<Sale>
    {
        public void Configure(EntityTypeBuilder<Sale> builder)
        {
            builder.ToTable("Sales");

            builder.HasKey(s => s.Id);

            builder.Property(s => s.Code)
                .IsRequired()
                .HasMaxLength(50);

            builder.HasIndex(s => new { s.Code, s.UserId })
                .IsUnique();

            builder.Property(s => s.Customer)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(s => s.PaymentMethod)
                .IsRequired()
                .HasConversion<string>()
                .HasMaxLength(50);

            builder.Property(s => s.Subtotal)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(s => s.Total)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(s => s.Discount)
                .HasPrecision(18, 2)
                .IsRequired(false);

            builder.Property(s => s.TotalItems)
                .IsRequired();

            builder.Property(s => s.Date)
                .IsRequired();

            builder.HasIndex(s => new { s.UserId, s.Date });

            builder.HasMany(s => s.Items)
                .WithOne(si => si.Sale)
                .HasForeignKey(si => si.SaleId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(s => s.User)
                .WithMany(u => u.Sales)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
