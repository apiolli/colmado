using Colmado.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Colmado.Infrastructure.Persistence.Configuration
{
    public class UsersConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(u => u.Name)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(256);

            builder.HasIndex(u => u.Email)
                .IsUnique();

            builder.Property(u => u.PasswordHash)
                .IsRequired();

            builder.Property(u => u.MarketName)
                .IsRequired(false)
                .HasMaxLength(150);

            builder.Property(u => u.PhoneNumber)
                .HasMaxLength(20)
                .IsRequired(false);

            builder.HasMany(u => u.Categories)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.Products)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(u => u.Sales)
                .WithOne(s => s.User)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.StockMovements)
                .WithOne(sm => sm.User)
                .HasForeignKey(sm => sm.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(u => u.SalesItems)
                .WithOne(si => si.User)
                .HasForeignKey(si => si.UserId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
