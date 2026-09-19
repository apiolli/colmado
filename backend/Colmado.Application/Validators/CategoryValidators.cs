using Colmado.Application.DTOs.Categories;
using FluentValidation;

namespace Colmado.Application.Validators
{
    public class CreateCategoryValidator : AbstractValidator<CreateCategoryDto>
    {
        public CreateCategoryValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Color).NotEmpty();
            RuleFor(x => x.Icon).NotEmpty();
        }
    }

    public class UpdateCategoryValidator : AbstractValidator<UpdateCategoryDto>
    {
        public UpdateCategoryValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Color).NotEmpty();
            RuleFor(x => x.Icon).NotEmpty();
        }
    }
}
