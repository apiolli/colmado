namespace Colmado.Application.DTOs.Auth
{
    public record UserProfileDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? MarketName { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
