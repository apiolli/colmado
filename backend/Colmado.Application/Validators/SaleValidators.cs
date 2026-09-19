using Colmado.Application.DTOs.Sales;
using FluentValidation;

namespace Colmado.Application.Validators
{
    public class CreateSaleValidator : AbstractValidator<CreateSaleDto>
    {
        public CreateSaleValidator()
        {
            RuleFor(x => x.Customer).NotEmpty().MaximumLength(150);
            RuleFor(x => x.PaymentMethod).IsInEnum();
            RuleFor(x => x.Discount).GreaterThanOrEqualTo(0).When(x => x.Discount.HasValue);
            RuleFor(x => x.Items).NotEmpty().WithMessage("La venta debe tener al menos un producto.");
            RuleForEach(x => x.Items).ChildRules(item =>
            {
                item.RuleFor(i => i.ProductId).NotEmpty();
                item.RuleFor(i => i.Quantity).GreaterThan(0);
            });
        }
    }
}
