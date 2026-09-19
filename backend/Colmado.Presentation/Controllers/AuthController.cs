using Colmado.Application.DTOs.Auth;
using Colmado.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Colmado.Presentation.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthController(IAuthService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterRequestDto dto, CancellationToken ct)
        {
            var result = await _service.RegisterAsync(dto, ct);
            return CreatedAtAction(nameof(Me), null, result);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginRequestDto dto, CancellationToken ct)
        {
            var result = await _service.LoginAsync(dto, ct);
            return Ok(result);
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<UserProfileDto>> Me(CancellationToken ct)
        {
            var result = await _service.GetProfileAsync(GetUserId(), ct);
            return Ok(result);
        }

        private Guid GetUserId() => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    }
}
