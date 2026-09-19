using Colmado.Application.DTOs.Products;
using FluentValidation;

namespace Colmado.Application.Validators
{
    public class CreateProductValidator : AbstractValidator<CreateProductDto>
    {
        public CreateProductValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
            RuleFor(x => x.SKU).NotEmpty().MaximumLength(50);
            RuleFor(x => x.UnitPrice).GreaterThan(0);
            RuleFor(x => x.Stock).GreaterThanOrEqualTo(0);
            RuleFor(x => x.MinimunStock).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Description).MaximumLength(500).When(x => x.Description != null);
            RuleFor(x => x.CategoryId).NotEmpty();
        }
    }

    public class UpdateProductValidator : AbstractValidator<UpdateProductDto>
    {
        public UpdateProductValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
            RuleFor(x => x.SKU).NotEmpty().MaximumLength(50);
            RuleFor(x => x.UnitPrice).GreaterThan(0);
            RuleFor(x => x.Stock).GreaterThanOrEqualTo(0);
            RuleFor(x => x.MinimunStock).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Description).MaximumLength(500).When(x => x.Description != null);
            RuleFor(x => x.CategoryId).NotEmpty();
        }
    }
}
