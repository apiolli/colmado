using Colmado.Application.DTOs.StockMovements;
using FluentValidation;

namespace Colmado.Application.Validators
{
    public class CreateStockMovementValidator : AbstractValidator<CreateStockMovementDto>
    {
        public CreateStockMovementValidator()
        {
            RuleFor(x => x.ProductId).NotEmpty();
            RuleFor(x => x.MovementType).IsInEnum();
            RuleFor(x => x.Amount).GreaterThan(0);
            RuleFor(x => x.Reason).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Note).MaximumLength(500).When(x => x.Note != null);
        }
    }
}
