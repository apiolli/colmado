using Colmado.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Colmado.Infrastructure.Persistence.Configuration
{
    public class StockMovementsConfiguration : IEntityTypeConfiguration<StockMovement>
    {
        public void Configure(EntityTypeBuilder<StockMovement> builder)
        {

            builder.Property(sm => sm.Amount)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(sm => sm.Reason)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(sm => sm.Note)
                .HasMaxLength(500)
                .IsRequired(false);

            builder.Property(sm => sm.Date)
                .IsRequired();

            builder.Property(sm => sm.MovementType)
                .IsRequired()
                .HasConversion<string>()
                .HasMaxLength(50);

            builder.Property(sm => sm.PaymentMethod)
                .IsRequired()
                .HasConversion<string>()
                .HasMaxLength(50);

            builder.HasIndex(sm => new { sm.UserId, sm.Date });
            builder.HasIndex(sm => sm.ProductId);

            builder.HasOne(sm => sm.Product)
                .WithMany()
                .HasForeignKey(sm => sm.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(sm => sm.User)
                .WithMany(u => u.StockMovements)
                .HasForeignKey(sm => sm.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
