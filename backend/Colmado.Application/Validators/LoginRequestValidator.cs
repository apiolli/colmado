using Colmado.Application.DTOs.Auth;
using FluentValidation;

namespace Colmado.Application.Validators
{
    public class LoginRequestValidator : AbstractValidator<LoginRequestDto>
    {
        public LoginRequestValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
