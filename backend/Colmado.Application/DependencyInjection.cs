using Colmado.Application.Interfaces.Services;
using Colmado.Application.Mappings;
using Colmado.Application.Services;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Colmado.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfile>());
            services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);

            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ISaleService, SaleService>();
            services.AddScoped<IStockMovementService, StockMovementService>();

            return services;
        }
    }
}
