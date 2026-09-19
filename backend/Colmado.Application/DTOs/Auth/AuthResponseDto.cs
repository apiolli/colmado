namespace Colmado.Application.DTOs.Auth
{
    public record AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public UserProfileDto User { get; set; } = null!;
    }
}
