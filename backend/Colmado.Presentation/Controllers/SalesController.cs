using Colmado.Application.DTOs.Sales;
using Colmado.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Colmado.Presentation.Controllers
{
    [ApiController]
    [Route("api/sales")]
    [Authorize]
    public class SalesController : ControllerBase
    {
        private readonly ISaleService _service;

        public SalesController(ISaleService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<SaleResponseDto>>> GetAll(
            [FromQuery] DateTime? from, [FromQuery] DateTime? to, CancellationToken ct)
            => Ok(await _service.GetAllAsync(GetUserId(), from, to, ct));

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<SaleResponseDto>> GetById(Guid id, CancellationToken ct)
            => Ok(await _service.GetByIdAsync(id, GetUserId(), ct));

        [HttpPost]
        public async Task<ActionResult<SaleResponseDto>> Create([FromBody] CreateSaleDto dto, CancellationToken ct)
        {
            var created = await _service.CreateAsync(dto, GetUserId(), ct);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Cancel(Guid id, CancellationToken ct)
        {
            await _service.CancelAsync(id, GetUserId(), ct);
            return NoContent();
        }

        private Guid GetUserId() => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    }
}
