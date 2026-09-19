using Colmado.Application.DTOs.Products;
using Colmado.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Colmado.Presentation.Controllers
{
    [ApiController]
    [Route("api/products")]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductsController(IProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductResponseDto>>> GetAll(CancellationToken ct)
            => Ok(await _service.GetAllAsync(GetUserId(), ct));

        [HttpGet("low-stock")]
        public async Task<ActionResult<IReadOnlyList<ProductResponseDto>>> GetLowStock(CancellationToken ct)
            => Ok(await _service.GetLowStockAsync(GetUserId(), ct));

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ProductResponseDto>> GetById(Guid id, CancellationToken ct)
            => Ok(await _service.GetByIdAsync(id, GetUserId(), ct));

        [HttpPost]
        public async Task<ActionResult<ProductResponseDto>> Create([FromBody] CreateProductDto dto, CancellationToken ct)
        {
            var created = await _service.CreateAsync(dto, GetUserId(), ct);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<ProductResponseDto>> Update(Guid id, [FromBody] UpdateProductDto dto, CancellationToken ct)
            => Ok(await _service.UpdateAsync(id, dto, GetUserId(), ct));

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
        {
            await _service.DeleteAsync(id, GetUserId(), ct);
            return NoContent();
        }

        private Guid GetUserId() => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    }
}
