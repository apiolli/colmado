using Colmado.Application.DTOs.Auth;

namespace Colmado.Application.Interfaces.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterRequestDto dto, CancellationToken ct = default);
        Task<AuthResponseDto> LoginAsync(LoginRequestDto dto, CancellationToken ct = default);
        Task<UserProfileDto> GetProfileAsync(Guid userId, CancellationToken ct = default);
    }
}
