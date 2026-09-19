using Colmado.Application.DTOs.Auth;
using FluentValidation;

namespace Colmado.Application.Validators
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequestDto>
    {
        public RegisterRequestValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
            RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(256);
            RuleFor(x => x.Password).NotEmpty().MinimumLength(6).MaximumLength(100);
            RuleFor(x => x.MarketName).MaximumLength(150).When(x => x.MarketName != null);
            RuleFor(x => x.PhoneNumber).MaximumLength(20).When(x => x.PhoneNumber != null);
        }
    }
}
