using Colmado.Domain.Entities;

namespace Colmado.Application.Interfaces.Auth
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
    }
}
