using AutoMapper;
using Colmado.Application.DTOs.Auth;
using Colmado.Application.DTOs.Categories;
using Colmado.Application.DTOs.Products;
using Colmado.Application.DTOs.Sales;
using Colmado.Application.DTOs.StockMovements;
using Colmado.Domain.Entities;

namespace Colmado.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserProfileDto>();
            CreateMap<RegisterRequestDto, User>()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.PasswordHash, o => o.Ignore())
                .ForMember(d => d.Categories, o => o.Ignore())
                .ForMember(d => d.Products, o => o.Ignore())
                .ForMember(d => d.Sales, o => o.Ignore())
                .ForMember(d => d.StockMovements, o => o.Ignore())
                .ForMember(d => d.SalesItems, o => o.Ignore());

            CreateMap<CreateCategoryDto, Category>();
            CreateMap<UpdateCategoryDto, Category>();
            CreateMap<Category, CategoryResponseDto>()
                .ForMember(d => d.ProductsCount, o => o.MapFrom(s => s.Products.Count));

            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();
            CreateMap<Product, ProductResponseDto>()
                .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.Category != null ? s.Category.Name : string.Empty))
                .ForMember(d => d.IsLowStock, o => o.MapFrom(s => s.Stock <= s.MinimunStock));

            CreateMap<SaleItem, SaleItemDto>()
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.Product != null ? s.Product.Name : string.Empty));
            CreateMap<Sale, SaleResponseDto>();

            CreateMap<StockMovement, StockMovementResponseDto>()
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.Product != null ? s.Product.Name : string.Empty));
        }
    }
}
