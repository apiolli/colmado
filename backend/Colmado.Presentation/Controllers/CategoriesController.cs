using Colmado.Application.DTOs.Categories;
using Colmado.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Colmado.Presentation.Controllers
{
    [ApiController]
    [Route("api/categories")]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoriesController(ICategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<CategoryResponseDto>>> GetAll(CancellationToken ct)
            => Ok(await _service.GetAllAsync(GetUserId(), ct));

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<CategoryResponseDto>> GetById(Guid id, CancellationToken ct)
            => Ok(await _service.GetByIdAsync(id, GetUserId(), ct));

        [HttpPost]
        public async Task<ActionResult<CategoryResponseDto>> Create([FromBody] CreateCategoryDto dto, CancellationToken ct)
        {
            var created = await _service.CreateAsync(dto, GetUserId(), ct);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<CategoryResponseDto>> Update(Guid id, [FromBody] UpdateCategoryDto dto, CancellationToken ct)
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
